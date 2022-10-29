<template>
  <p class="text-h5">Organization</p>
  <p>Name: {{organization.name}}</p>
  <q-btn outline color="primary" label="get credentials" @click="viewCredentials" />
</template>

<script setup>

const organization = {
  name: "My Organization",
};

function viewCredentials() {
  console.log("Get credentials");
}
</script>

<style scoped>

</style>
