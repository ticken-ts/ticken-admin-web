<template>
  <CustomButton
    outline
    color="primary"
    label="show credentials"
    @click="viewCredentials"
  />
  <q-dialog v-model="showingDialog">
    <CustomCard>
      <p class="text-h5">Credentials</p>
      <p class="text-subtitle2">Private Key</p>
      <p class="text-subtitle2">Certificate</p>
      <p class="text-subtitle2">TLS Certificate</p>
    </CustomCard>
  </q-dialog>
</template>
<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import {ref} from 'vue';
import CustomCard from '@/components/CustomCard.vue';

const showingDialog = ref(false);
const viewCredentials = () => {
  showingDialog.value = true;
};
</script>
