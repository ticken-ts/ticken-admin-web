<template>
  <div class="row items-start justify-between">
    <div>
      <p class="text-h5">Organization</p>
      <p>Name: {{ organization.name }}</p>
    </div>
    <CustomButton
      outline
      color="primary"
      label="get credentials"
      @click="viewCredentials"
    />
  </div>
  <q-expansion-item :default-opened="true" label="Details" icon="info" expand-separator>
    <CustomCard>
      <p class="text-h6">Peers</p>
      <q-tab-panel name="peers">
        <q-table
          :rows="organization.peers"
          row-key="name"
          :rows-per-page-options="[5, 10, 15]"
        ></q-table>
      </q-tab-panel>
      <p class="text-h6">Users</p>
      <q-tab-panel name="users">
        <q-table
          :rows="organization.users"
          row-key="email"
          :rows-per-page-options="[5, 10, 15]"
        ></q-table>
      </q-tab-panel>
    </CustomCard>
  </q-expansion-item>
</template>

<script setup>
import CustomButton from "@/components/CustomButton.vue";
import CustomCard from "@/components/CustomCard.vue";

const organization = {
  name: "My Organization",
  peers: [
    {
      name: "peer0",
      url: "http://localhost:7051",
    },
    {
      name: "peer1",
      url: "http://localhost:8051",
    },
    {
      name: "peer2",
      url: "http://localhost:9051",
    },
    {
      name: "peer3",
      url: "http://localhost:10051",
    },
    {
      name: "peer4",
      url: "http://localhost:11051",
    },
    {
      name: "peer5",
      url: "http://localhost:12051",
    },
    {
      name: "peer6",
      url: "http://localhost:13051",
    },
    {
      name: "peer7",
      url: "http://localhost:14051",
    },
  ],
  users: [
    {
      email: "jferreyra@fi.uba.ar",
      role: "admin",
    },
  ]
};

function viewCredentials() {
  console.log("Get credentials");
}
</script>

<style scoped></style>
