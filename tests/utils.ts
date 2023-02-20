import { vi } from 'vitest';
import type { StateTree, StoreDefinition, _ActionsTree, _GettersTree } from 'pinia';
import { createPinia, setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { type PrettyDOMOptions, getQueriesForElement, prettyDOM } from '@testing-library/dom';
import { type MountingOptions, mount } from '@vue/test-utils';
import { vuetify } from '@/vuetify';
import { mountedWrappers } from './cleanup';

export function render(component: any, options?: MountingOptions<any>, initialState?: StateTree) {
  const div = document.createElement('div');
  const baseElement = document.body;
  const container = baseElement.appendChild(div);

  const wrapper = mount(component, {
    ...options,
    attachTo: container,
    global: {
      ...options?.global,
      plugins: [
        vuetify,
        createTestingPinia({
          createSpy: vi.fn,
          initialState,
        }),
      ],
    },
  });

  const parentElement = 'parentElement';
  wrapper[parentElement].replaceWith(...wrapper[parentElement].childNodes);
  mountedWrappers.add(wrapper);

  return {
    container,
    baseElement,
    /* eslint-disable no-console */
    debug: (el = baseElement, maxLength?: number, options?: PrettyDOMOptions) =>
      Array.isArray(el)
        ? el.forEach(e => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    /* eslint-enable */
    unmount: wrapper.unmount.bind(wrapper),
    html: wrapper.html.bind(wrapper),
    emitted: wrapper.emitted.bind(wrapper),
    rerender: wrapper.setProps.bind(wrapper),
    findComponent: wrapper.findComponent.bind(wrapper),
    findAllComponents: wrapper.findAllComponents.bind(wrapper),
    ...getQueriesForElement(baseElement),
  };
}

export type RenderResult = ReturnType<typeof render>;

export function createStore<Id extends string, S extends StateTree = StateTree, G = _GettersTree<S>, A = _ActionsTree>(
  useStore: StoreDefinition<Id, S, G, A>,
) {
  return function (initialState: Partial<S> = {}) {
    setActivePinia(createPinia());
    const store = useStore();
    for (const key in initialState) {
      store[key] = initialState[key]!;
    }
    return store;
  };
}

export type { StateTree } from 'pinia';
