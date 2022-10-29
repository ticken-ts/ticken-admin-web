<template>
  <main class="row">
    <img src="@/assets/bg-login.jpg" alt="background" class="background">
    <q-card class="col-md-3 col-sm-4 col-11">
      <q-card-section class="column items-stretch">
        <img :src="logo" alt="logo" class="logo" />
        <h4 class="title text-center">Login</h4>
      </q-card-section>
      <q-card-section class="column items-stretch">
        <q-form @submit="login()" class="column">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            filled
            class="q-mb-md"
            :rules="[val => val && val.length > 0 || 'Please type your email']"
          />
          <q-input
            v-model="password"
            label="Password"
            type="password"
            filled
            class="q-mb-md"
            :rules="[val => val && val.length > 0 || 'Please type your password']"
          />
          <q-btn
            type="submit"
            color="primary"
            label="Login"
            class="q-mt-md"
            :loading="loading"
          />
        </q-form>
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
const { isLoggedIn, loading } = storeToRefs(session);

function login() {
  session.login({ email: email.value, password: password.value });
}

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
}
</style>
