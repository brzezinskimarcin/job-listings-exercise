<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useJobsStore } from '@/stores/jobs';
import SummaryCard from '@/components/SummaryCard.vue';
import SearchBar from '@/components/SearchBar.vue';

const jobsStore = useJobsStore();
const { loading, jobs, filters } = storeToRefs(jobsStore);
const { fetchData, addTag, removeTag, removeAll } = jobsStore;

fetchData();
</script>

<template>
  <header>
    <v-img :min-height="120" cover src="/bg-header.svg" class="bg-primary w-100" />
    <SearchBar
      :tags="filters"
      class="mx-8 mt-n10"
      @close="removeTag"
      @clear="removeAll"
    />
  </header>

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
      <SummaryCard
        v-for="job in jobs"
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
        @click:tag="addTag"
      />
    </template>
  </main>
</template>
