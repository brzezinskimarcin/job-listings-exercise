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

interface JobListingSummary {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  details: string[];
  tags: string[];
}

export const useJobsStore = defineStore('jobs', () => {
  const loading = ref(false);
  const allJobs = ref<JobListingSummary[]>([]);

  async function fetchData () {
    loading.value = true;
    allJobs.value = (await fetchJobs()).map((job) => ({
      id: job.id,
      company: job.company,
      logo: job.logo,
      new: job.new,
      featured: job.featured,
      position: job.position,
      details: [job.postedAt, job.contract, job.location],
      tags: [job.role, job.level, ...job.languages, ...job.tools]
    }));
    loading.value = false;
  }

  return { loading, allJobs, fetchData };
});
