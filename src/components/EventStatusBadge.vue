<template>
    <q-badge class="self-start" outline :color="statusColor" :label="statusPretty" />
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { EventStatus } from '@/endpoints/event';

const props = defineProps<{
    status: EventStatus;
}>();

const statusPretty = computed(() => {
  switch (props.status) {
    case EventStatus.DRAFT:
      return "Draft";
    case EventStatus.ON_SALE:
      return "On Sale";
    case EventStatus.RUNNING:
      return "Running";
    case EventStatus.FINISHED:
      return "Finished";
    default:
      return "Unknown";
  }
});

const statusColor = computed(() => {
  switch (props.status) {
    case EventStatus.DRAFT:
      return "grey";
    case EventStatus.ON_SALE:
      return "orange";
    case EventStatus.RUNNING:
      return "green";
    case EventStatus.FINISHED:
      return "red";
    default:
      return "grey";
  }
});
</script>