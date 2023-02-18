import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { JobListingsResponse } from '@/types/api';
import { useFetch } from '@/composables/fetch';

export const useJobsStore = defineStore('jobsStore', () => {
  const { execute: fetchData, data: allJobs, loading } = useFetch({
    url: 'jobs',
    mapResponse: (jobs: JobListingsResponse[]) => jobs.map((job) => ({
      id: job.id,
      company: job.company,
      logo: job.logo,
      new: job.new,
      featured: job.featured,
      position: job.position,
      details: [job.postedAt, job.contract, job.location],
      tags: [job.role, job.level, ...job.languages, ...job.tools]
    }))
  });
  const filters = ref<string[]>([]);
  const jobs = computed(() => {
    return allJobs.value?.filter(({ tags }) => filters.value.every((filter) => tags.includes(filter)))
  });

  function addTag (tag: string) {
    if (!filters.value.includes(tag)) {
      filters.value.push(tag);
    }
  }
  
  function removeTag (tag: string) {
    const tagIndex = filters.value.indexOf(tag);
    filters.value.splice(tagIndex, 1);
  }

  function removeAll () {
    filters.value = [];
  }

  return { allJobs, loading, jobs, filters, fetchData, addTag, removeTag, removeAll };
});
