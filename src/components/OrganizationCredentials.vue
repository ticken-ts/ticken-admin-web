<template>
  <CustomButton
    filled
    color="primary"
    label="show credentials"
    @click="viewCredentials"
    class="text-caption"
  />
  <q-dialog v-model="showingDialog">
    <CustomCard class="full-width">
      <p class="text-h5">Credentials</p>
      <p class="text q-mb-none">Certificate</p>
      <q-input outlined readonly :model-value="orgCert">
        <template v-slot:after>
          <q-icon name="ion-copy" @click="copyCert" class="cursor-pointer" />
        </template>
      </q-input>
      <p class="text q-mb-none q-mt-md">TLS Certificate</p>
      <q-input class="mt-0" outlined readonly v-model="tlsCert">
        <template v-slot:after>
          <q-icon name="ion-copy" @click="copyTls" class="cursor-pointer" />
        </template>
      </q-input>
    </CustomCard>
  </q-dialog>
</template>
<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import {ref} from 'vue';
import CustomCard from '@/components/CustomCard.vue';
import type { CERT, Node } from "@/endpoints/organization";

const showingDialog = ref(false);
const viewCredentials = () => {
  showingDialog.value = true;
};

const props = defineProps<{
  node: Node;
}>();

const orgCert = ref(props.node.org_cert.Content);
const tlsCert = ref(props.node.tls_cert.Content);

const copyCert = () => {
  navigator.clipboard.writeText(orgCert.value);
};

const copyTls = () => {
  navigator.clipboard.writeText(tlsCert.value);
};

</script>
