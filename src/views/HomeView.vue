<script setup lang="ts">
import { useSessionStore } from "@/stores/session";
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconDocumentation from '@/components/icons/IconDocumentation.vue';

const session = useSessionStore();

function logout() {
  session.logout();
}
</script>

<template>
  <div class="container">
    <header>
      <h2>Dashboard</h2>
    </header>
    <main>
      <h1>Home page</h1>
      <button @click="logout">Logout</button>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

header {
  background-color: $primary;
  width: 100%;
  color: white;
  padding: 10px;
}

main {
  justify-content: flex-start;
  align-items: center;
  max-width: 768px;
}
</style>
