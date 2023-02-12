<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const { loading, allJobs } = storeToRefs(jobsStore);
const { fetchData } = jobsStore;

fetchData();
</script>

<template>
  <main>
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="64"
        :width="4"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <div class="mt-4 text-h6">Loading jobs...</div>
    </div>
    <pre v-else>{{ allJobs }}</pre>
  </main>
</template>
