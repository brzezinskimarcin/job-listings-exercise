<script setup lang="ts">
defineProps<{
  accent: boolean;
  thumbnailUrl: string;
  caption: string;
  badges: {
    color: string;
    label: string;
  }[];
  title: string;
  subtitles: string[];
  tags: string[];
}>();

const emit = defineEmits<{
  (event: 'click:tag', tag: string): void;
}>();
</script>

<template>
  <v-card elevation="3" :class="['px-5 mt-16 mt-sm-0 py-4 overflow-visible', { accent }]">
    <div class="mt-n13 mt-sm-0 d-sm-flex align-center">
      <v-avatar class="ma-2" size="x-large">
        <v-img :src="thumbnailUrl" />
      </v-avatar>
      <div class="flex-grow-1 pa-3">
        <div class="d-flex align-center">
          <div class="font-weight-bold text-caption text-primary mr-1">
            {{ caption }}
          </div>
          <v-chip
            v-for="{ color, label } in badges"
            :key="label"
            :color="color"
            size="x-small"
            variant="flat"
            class="font-weight-bold mx-1"
          >
            {{ label }}
          </v-chip>
        </div>
        <div class="font-weight-bold text-h6 ">
          {{ title }}
        </div>
        <div class="text-medium-emphasis text-caption">
          {{ subtitles.join(' · ') }}
        </div>
      </div>
      <v-divider class="my-1 mx-3 d-sm-none" />
      <div class="pa-1">
        <v-chip
          v-for="tag in tags"
          :key="tag"
          color="primary"
          label
          class="font-weight-bold ma-2"
          @click="emit('click:tag', tag)"
        >
          {{ tag }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.accent {
  border-left: 4px solid rgb(var(--v-theme-primary));
  padding-left: 16px !important;
}
</style>
