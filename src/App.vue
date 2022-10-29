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
    if (!wasLoggedIn && isLoggedIn) {
      console.log("User has logged in")
      router.push("/");
    } else if (wasLoggedIn && !isLoggedIn) {
      console.log("User has logged out")
      router.push("/login");
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <RouterView />
</template>
