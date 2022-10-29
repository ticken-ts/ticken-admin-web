<template>
  <main class="row">
    <img src="@/assets/bg-login.jpg" alt="background" class="background" />
    <CustomCard class="col-md-3 col-sm-4 col-11">
      <div class="column items-center">
        <img :src="logo" alt="logo" class="logo" />
        <p class="text-h4 title text-center">Login</p>
      </div>
      <CustomForm @submit="login()" class="column">
        <CustomInput
          v-model="email"
          label="Email"
          type="email"
          filled
          class="q-mb-md"
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your email',
          ]"
        />
        <CustomInput
          v-model="password"
          label="Password"
          type="password"
          filled
          class="q-mb-md"
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your password',
          ]"
        />
        <CustomButton
          type="submit"
          color="primary"
          label="Login"
          class="q-mt-md"
          :loading="loading"
        />
      </CustomForm>
    </CustomCard>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useSessionStore } from "@/stores/session";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.svg";
import CustomCard from "@/components/CustomCard.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomForm from "@/components/CustomForm.vue";

const email = ref("");
const password = ref("");

const session = useSessionStore();
const router = useRouter();
const { isLoggedIn, loading } = storeToRefs(session);

function login() {
  console.log("logging in")
  session.login({ email: email.value, password: password.value });
}

watch(isLoggedIn, (is) => {
  if (is) {
    router.push("/");
  }
});
</script>

<style scoped lang="scss">
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
