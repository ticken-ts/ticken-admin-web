<template>
  <main>
    <h1>Login</h1>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="session.login">Login</button>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const session = useSessionStore();
const router = useRouter();
const { isLoggedIn } = storeToRefs(session);

watch(isLoggedIn, (is) => {
  if (is) {
    router.push("/");
  }
});
</script>

<style scoped>
main {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input {
  margin: 0.5rem 0;
}
button {
  margin-top: 1rem;
}
</style>
