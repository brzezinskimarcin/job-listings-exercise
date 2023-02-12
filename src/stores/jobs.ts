import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { JobListingsResponse } from '@/types/api';
import jobsResponse from '@/mock/data.json';

function fetchJobs (): Promise<JobListingsResponse[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(jobsResponse);
    }, 3000);
  });
}

export const useJobsStore = defineStore('jobs', () => {
  const loading = ref(false);
  const allJobs = ref<JobListingsResponse[]>([]);

  async function fetchData () {
    loading.value = true;
    allJobs.value = await fetchJobs();
    loading.value = false;
  }

  return { loading, allJobs, fetchData };
});
