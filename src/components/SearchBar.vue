<script setup lang="ts">
defineProps<{
  tags: string[];
}>();

const emit = defineEmits<{
  (event: 'close', tag: string): void;
  (event: 'clear'): void;
}>();
</script>

<template lang="pug">
v-card.py-4.px-5.d-flex.align-center(
  v-if="tags.length",
  elevation="3"
)
  .flex-grow-1.pr-2
    v-chip.font-weight-bold.ma-2(
      v-for="tag in tags",
      :key="tag",
      color="primary",
      label,
      closable,
      @click:close="emit('close', tag)"
    ) {{ tag }}
  button.font-weight-bold.text-primary.px-2(
    type="button",
    @click="emit('clear')"
  ) Clear
</template>
