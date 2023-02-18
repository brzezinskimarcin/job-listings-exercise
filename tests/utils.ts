import { vi } from 'vitest';
import type { StoreDefinition, StateTree, _GettersTree, _ActionsTree } from 'pinia';
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { type RenderOptions, render as basicRender } from '@testing-library/vue';
import { vuetify } from '@/vuetify';


export function render(component: any, options?: RenderOptions, initialState?: StateTree) {
  return basicRender(component, {
    ...options,
    global: {
      ...options?.global,
      plugins: [
        vuetify,
        createTestingPinia({
          createSpy: vi.fn,
          initialState
        })
      ]
    }
  });
}

export function createStore<Id extends string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree>(
  useStore: StoreDefinition<Id, S, G, A>
) {
  return function(initialState: Partial<S> = {}) {
    setActivePinia(createPinia());
    const store = useStore();
    for (const key in initialState) {
      store[key] = initialState[key]!;
    }
    return store;
  }
}

export type { StateTree } from 'pinia';
