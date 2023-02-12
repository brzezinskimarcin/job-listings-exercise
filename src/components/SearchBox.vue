<script setup lang="ts">
defineProps<{
  tags: string[];
}>();

</script>

<template>
  <v-card
    v-if="tags.length"
    elevation="3"
    class="py-4 px-5 d-flex align-center"
  >
    <div class="flex-grow-1 pr-2">
      <v-chip
        v-for="tag in tags" :key="tag"
        color="primary"
        class="font-weight-bold ma-2"
        label
        closable
      >
        {{ tag }}
      </v-chip>
    </div>
    <button class="font-weight-bold text-primary px-2">Clear</button>
  </v-card>
</template>
