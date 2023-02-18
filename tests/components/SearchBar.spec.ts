import { describe, expect, it } from 'vitest';
import { type RenderResult, within, fireEvent } from '@testing-library/vue';
import { render } from '@/../tests/utils';
import SearchBar from '@/components/SearchBar.vue';

describe('@/components/SearchBar.vue', () => {
  let wrapper: RenderResult;
  const createComponent = (tags: string[]) => {
    wrapper = render(SearchBar, {
      props: { tags }
    });
  };
  const findTag = (tag: string) => wrapper.getByText(tag);
  const findCloseButton = (tag: string) => within(findTag(tag)).getByLabelText('Close');
  const findClearButton = () => wrapper.getByRole('button', { name: 'Clear' });

  it('renders nothing if no tags are passed as prop', () => {
    createComponent([]);
    expect(wrapper.container).toBeEmptyDOMElement();
  });

  it('renders tags, that are passed as prop', () => {
    createComponent(['Frontend', 'Senior']);
    expect(findTag('Frontend')).toBeVisible();
    expect(findTag('Senior')).toBeVisible();
  });

  it('emits "close" event when clicking on a chip close icon', async () => {
    createComponent(['Frontend', 'Senior']);
    await fireEvent.click(findCloseButton('Frontend'));
    expect(wrapper).toHaveEmitted('close', 'Frontend');
  });

  it('emits "clear" event when clicking on "Clear" button', async () => {
    createComponent(['Frontend', 'Senior']);
    await fireEvent.click(findClearButton());
    expect(wrapper).toHaveEmitted('clear');
  });
});
