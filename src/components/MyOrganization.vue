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
  <ExpandableIfWide>
    <p class="text-h6">Peers</p>
    <q-tab-panel name="peers">
      <q-table
        :rows="organization.peers"
        row-key="email"
        :rows-per-page-options="[5, 10, 15]"
      ></q-table>
    </q-tab-panel>
    <UserTable :users="organization.users" />
  </ExpandableIfWide>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import UserTable from "@/components/UserTable.vue";
import ExpandableIfWide from "@/components/ExpandableIfWide.vue";

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
    {
      email: "ft0@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft00@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft2@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft3@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft4@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft5@fi.uba.ar",
      role: "admin",
    },
    {
      email: "ft6@fi.uba.ar",
      role: "admin",
    },
  ],
};

function viewCredentials() {
  console.log("Get credentials");
}
</script>
