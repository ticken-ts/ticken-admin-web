<script setup lang="ts">
import { RouterView } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { watch } from "vue";
import router from "@/router";
import {storeToRefs} from 'pinia';

const session = useSessionStore();
const { isLoggedIn } = storeToRefs(session);

watch(
  isLoggedIn,
  (isLoggedIn, wasLoggedIn) => {
    console.log("Was logged in?", wasLoggedIn);
    console.log("Is logged in?", isLoggedIn);
    if (!wasLoggedIn && isLoggedIn) {
      router.push("/");
    } else if (wasLoggedIn && !isLoggedIn) {
      router.push("/login");
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <RouterView />
</template>
