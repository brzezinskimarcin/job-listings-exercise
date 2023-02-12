<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import SummaryCard from '@/components/SummaryCard.vue';

const jobsStore = useJobsStore();
const { loading, allJobs } = storeToRefs(jobsStore);
const { fetchData } = jobsStore;

fetchData();
</script>

<template>
  <main class="px-8 pt-0 pt-sm-16">
    <div v-if="loading" class="text-center">
      <v-progress-circular
        :size="64"
        :width="4"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <div class="mt-4 text-h6">Loading jobs...</div>
    </div>
    <template v-else>
      <!-- <pre v-else>{{ allJobs }}</pre> -->
      <SummaryCard
        v-for="job in allJobs"
        :key="job.id"
        :accent="job.new"
        :thumbnail-url="job.logo"
        :caption="job.company"
        :badges="[
          job.new ? [{ color: 'primary', label: 'NEW!' }] : [],
          job.featured ? [{ color: 'secondary', label: 'FEATURED' }] : []
        ].flat()"
        :title="job.position"
        :subtitles="job.details"
        :tags="job.tags"
        class="mb-8"
      />
    </template>
  </main>
</template>
