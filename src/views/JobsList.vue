<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';

const jobsStore = useJobsStore();
const { loading, allJobs } = storeToRefs(jobsStore);
const { fetchData } = jobsStore;

fetchData();
</script>

<template>
  <pre>{{ loading }}</pre>
  <pre>{{ allJobs }}</pre>
</template>
