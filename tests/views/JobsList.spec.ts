import { describe, expect, it } from 'vitest';
import { type StateTree, type RenderResult, render } from '@/../tests/utils';
import { useJobsStore } from '@/stores/jobs';
import JobsList from '@/views/JobsList.vue';
import SearchBar from '@/components/SearchBar.vue';
import SummaryCard from '@/components/SummaryCard.vue';
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
  const findSearchBar = () => wrapper.findComponent(SearchBar);
  const findSummaryCards = () => wrapper.findAllComponents(SummaryCard);

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
    expect(findSearchBar().props('tags')).toEqual(['Frontend', 'Backend']);
  });

  it('calls "fetchData" initially', () => {
    createComponent({ loading: true });
    const { fetchData } = useJobsStore();
    expect(fetchData).toHaveBeenCalledTimes(1);
  });

  it('calls "removeTag" when SearchBox emits "close"', () => {
    createComponent({ filters: ['Frontend', 'Backend'] });
    findSearchBar().vm.$emit('close', 'Frontend');
    const { removeTag } = useJobsStore();
    expect(removeTag).toHaveBeenCalledWith('Frontend');
  });

  it('calls "removeAll" when SearchBox emits "clear"', () => {
    createComponent({ filters: ['Frontend', 'Backend'] });
    findSearchBar().vm.$emit('clear');
    const { removeAll } = useJobsStore();
    expect(removeAll).toHaveBeenCalled();
  });

  it('calls "addTag" when SummaryCard emits "click:tag"', () => {
    createComponent({ allJobs });
    findSummaryCards()[0].vm.$emit('click:tag', 'Frontend');
    const { addTag } = useJobsStore();
    expect(addTag).toHaveBeenCalledWith('Frontend');
  });
});
