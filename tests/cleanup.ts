import type { VueWrapper } from '@vue/test-utils';

export const mountedWrappers = new Set<VueWrapper<any>>();

export function cleanup() {
  mountedWrappers.forEach((wrapper) => {
    if (
      wrapper.element.parentNode
      && wrapper.element.parentNode.parentNode === document.body
    ) {
      document.body.removeChild(wrapper.element.parentNode);
    }
    wrapper.unmount();
    mountedWrappers.delete(wrapper);
  });
}
