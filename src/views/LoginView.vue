<template>
  <main>
    <img src="@/assets/bg-login.jpg" alt="background" class="background">
    <q-card>
      <q-card-section class="column items-center">
        <img :src="logo" alt="logo" class="logo" />
        <h4 class="title">Login</h4>
        <input placeholder="email" type="email" v-model="email" />
        <input placeholder="password" type="password" v-model="password" />
        <button @click="session.login">Login</button>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";

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

<style scoped lang="scss">
@import "@/assets/colors.scss";
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

.logo {
  height: 25vh;
  pointer-events: none;
}

.title {
  margin-bottom: 1em;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: $primary-dark;
}
</style>
