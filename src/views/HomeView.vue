<script setup lang="ts">
import { useSessionStore } from "@/stores/session";

const session = useSessionStore();

function logout() {
  session.logout();
}
</script>

<template>
  <main>
    <h1>Home page</h1>
    <button @click="logout">Logout</button>
  </main>
</template>
