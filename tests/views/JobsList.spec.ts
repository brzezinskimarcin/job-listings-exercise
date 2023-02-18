import { describe, expect, it } from 'vitest';
import { type RenderResult, fireEvent } from '@testing-library/vue';
import { type StateTree, render } from '@/../tests/utils';
import { useJobsStore } from '@/stores/jobs';
import JobsList from '@/views/JobsList.vue';
import allJobs from '@/../tests/__mocks/jobs.json';

describe('@/views/JobsList.vue', () => {
  let wrapper: RenderResult;
  const createComponent = (jobsStore: StateTree) => {
    wrapper = render(JobsList, {
      global: {
        stubs: ['SearchBar', 'SummaryCard']
      }
    }, { jobsStore });
  };
  const findLoadingText = () => wrapper.getByText('Loading jobs...');
  const findSearchBar = () => wrapper.container.querySelector('search-bar-stub')!;
  const findSummaryCards = () => [...wrapper.getByRole('main').querySelectorAll('summary-card-stub')];

  it('shows loading text when fetching jobs', () => {
    createComponent({ loading: true });
    expect(findLoadingText()).toBeVisible();
  });

  it('shows summary cards after fetching jobs', () => {
    createComponent({ allJobs });
    expect(findSummaryCards()).toHaveLength(2);
  });

  it('passes filters to SearchBox', () => {
    createComponent({ filters: ['Frontend', 'Backend'] });
    expect(findSearchBar()).toHaveAttribute('tags', 'Frontend,Backend');
  });

  it('calls "fetchData" initially', () => {
    createComponent({ loading: true });
    const { fetchData } = useJobsStore();
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it('calls "removeTag" when SearchBox emits "close"', async () => {
    createComponent({ filters: ['Frontend', 'Backend'] });
    const event = new CustomEvent('close', { detail: 'Frontend' });
    await fireEvent(findSearchBar(), event);
    const { removeTag } = useJobsStore();
    expect(removeTag).toHaveBeenCalledWith(event);
  });

  it('calls "removeAll" when SearchBox emits "clear"', async () => {
    createComponent({ filters: ['Frontend', 'Backend'] });
    await fireEvent(findSearchBar(), new CustomEvent('clear'));
    const { removeAll } = useJobsStore();
    expect(removeAll).toHaveBeenCalled();
  });

  it('calls "addTag" when SummaryCard emits "click:tag"', async () => {
    createComponent({ allJobs });
    const event = new CustomEvent('click:tag', { detail: 'Frontend' });
    await fireEvent(findSummaryCards()[0], event);
    const { addTag } = useJobsStore();
    expect(addTag).toHaveBeenCalledWith(event);
  });
});
