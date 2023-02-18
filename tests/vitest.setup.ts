import matchers, { type TestingLibraryMatchers  } from '@testing-library/jest-dom/matchers';
import { cleanup, type RenderResult } from '@testing-library/vue';
import { afterEach, expect } from 'vitest';

afterEach(cleanup);
expect.extend(matchers);
expect.extend({
  toHaveEmitted(wrapper: RenderResult, eventName: string, ...payload: unknown[]) {
    const { isNot, equals } = this;
    const emitted: unknown[][] = wrapper.emitted(eventName) || [];

    if (arguments.length >= 3) {
      return {
        pass: emitted
          .some((event: unknown[]) =>
            payload.length === event.length && payload.every((payload, i) => equals(event[i], payload))
          ),
        message: () => `The "${eventName}" event was${isNot ? '' : ' not'} emitted with the payload: [${payload}]${isNot ? `, while it shouldn't.` : `. Received: [${emitted}].`}`
      };
    } else {
      return {
        pass: emitted.length > 0,
        message: () => `The "${eventName}" event was${isNot ? '' : ' not'} emitted${isNot ? `, while it shouldn't.`: '.'}`
      }
    }
  }
});

class ResizeObserver {
  callback?: ResizeObserverCallback

  constructor (callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe () {
    this.callback?.([], this)
  }

  unobserve () {
    this.callback = undefined
  }

  disconnect () {
    this.callback = undefined
  }
}

(global as any).CSS = { supports: () => false };
(global as any).ResizeObserver = ResizeObserver;

declare global {
  namespace Vi {
    interface Assertion<T> extends TestingLibraryMatchers<typeof expect.stringContaining, T> {
      toHaveEmitted(eventName: string, ...payloads: any[]): T;
    }
  }
}
