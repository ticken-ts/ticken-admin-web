<template>
  <q-img class="eventPoster" fit="cover" :src="getPosterUri(posterID)" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { getPosterUri } from "@/endpoints/event";

defineProps<{
  posterID: string;
}>();
</script>

<style scoped lang="scss">
.eventPoster {
  aspect-ratio: 21/9;
}
</style>
