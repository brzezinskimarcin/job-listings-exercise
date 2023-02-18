import { describe, expect, it } from 'vitest';
import { createStore } from '@/../tests/utils';
import { useJobsStore } from '@/stores/jobs';
import allJobs from '@/../tests/__mocks/jobs.json';

describe('@/stores/jobs', () => {
  const createJobsStore = createStore(useJobsStore);

  it('action "addTag" adds new filter', () => {
    const jobsStore = createJobsStore();
    expect(jobsStore.filters).toEqual([]);
    jobsStore.addTag('Frontend');
    expect(jobsStore.filters).toEqual(['Frontend']);
  });

  it('action "removeTag" removes filter', () => {
    const jobsStore = createJobsStore({ filters: ['Backend', 'Frontend']});
    expect(jobsStore.filters).toEqual(['Backend', 'Frontend']);
    jobsStore.removeTag('Frontend');
    expect(jobsStore.filters).toEqual(['Backend']);
  });

  it('action "removeAll" removes all filters', () => {
    const jobsStore = createJobsStore({ filters: ['Backend', 'Frontend']});
    expect(jobsStore.filters).toEqual(['Backend', 'Frontend']);
    jobsStore.removeAll();
    expect(jobsStore.filters).toEqual([]);
  });

  it('getter "jobs" filters out all jobs based on selected filters', () => {
    const jobsStore = createJobsStore({
      filters: ['Midweight'],
      allJobs
    });
    expect(jobsStore.jobs).toEqual([allJobs[1]]);
  });
});
