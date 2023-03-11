<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import SummaryCard from '@/components/SummaryCard.vue';
import SearchBar from '@/components/SearchBar.vue';

const jobsStore = useJobsStore();
const { loading, jobs, filters } = storeToRefs(jobsStore);
const { fetchData, addTag, removeTag, removeAll } = jobsStore;

fetchData();

function getBadges(newJob: boolean, featuredJob: boolean) {
  return [
    newJob ? [{ color: 'primary', label: 'NEW!' }] : [],
    featuredJob ? [{ color: 'secondary', label: 'FEATURED' }] : [],
  ].flat();
}
</script>

<template lang="pug">
header
  v-img.bg-primary.w-100(
    :min-height="120",
    src="/bg-header.svg",
    cover
  )
  search-bar.mx-8.mt-n10(
    :tags="filters",
    @close="removeTag",
    @clear="removeAll"
  )
main.px-8.pt-0.pt-sm-16
  .text-center(v-if="loading")
    v-progress-circular(
      :size="64",
      :width="4",
      color="primary",
      indeterminate
    )
    .mt-4.text-h6 Loading jobs...
  template(v-else)
    summary-card.mb-8(
      v-for="job in jobs",
      :key="job.id",
      :accent="job.new",
      :thumbnail-url="job.logo",
      :caption="job.company",
      :badges="getBadges(job.new, job.featured)",
      :title="job.position",
      :subtitles="job.details",
      :tags="job.tags",
      @click:tag="addTag"
    )
</template>
