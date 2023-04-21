<script setup lang="ts">
import { RouterView } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { onMounted } from "vue";

const session = useSessionStore();

onMounted(() => {
  session.init();
});
</script>

<template>
  <RouterView v-if="session.initialized" />
</template>
