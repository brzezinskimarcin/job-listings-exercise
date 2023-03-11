<script setup lang="ts">
defineProps<{
  accent: boolean;
  thumbnailUrl: string;
  caption: string;
  badges: Array<{
    color: string;
    label: string;
  }>;
  title: string;
  subtitles: string[];
  tags: string[];
}>();

const emit = defineEmits<(event: 'click:tag', tag: string) => void>();
</script>

<template lang="pug">
v-card.px-5.mt-16.mt-sm-0.py-4.overflow-visible(
  :class="{ accent }",
  elevation="3"
)
  .mt-n13.mt-sm-0.d-sm-flex.align-center
    v-avatar.ma-2(size="x-large")
      v-img(:src="thumbnailUrl")
    .flex-grow-1.pa-3
      .d-flex.align-center
        .font-weight-bold.text-caption.text-primary.mr-1 {{ caption }}
        v-chip.font-weight-bold.mx-1(
          v-for="{ color, label } in badges",
          :key="label",
          :color="color",
          size="x-small",
          variant="flat"
        ) {{ label }}
      .font-weight-bold.text-h6 {{ title }}
      .text-medium-emphasis.text-caption {{ subtitles.join(' · ') }}
    v-divider.my-1.mx-3.d-sm-none
    .pa-1
      v-chip.font-weight-bold.ma-2(
        v-for="tag in tags",
        :key="tag",
        color="primary",
        label,
        @click="emit('click:tag', tag)"
      ) {{ tag }}
</template>

<style scoped>
.accent {
  border-left: 4px solid rgb(var(--v-theme-primary));
  padding-left: 16px !important;
}
</style>
