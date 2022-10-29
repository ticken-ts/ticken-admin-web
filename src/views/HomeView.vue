<script setup lang="ts">
import { useSessionStore } from "@/stores/session";
import { ref } from "vue";
import EventList from "@/components/EventList.vue";
import Organization from "@/components/Organization.vue";

const showLogoutPrompt = ref(false);

const session = useSessionStore();
function logout() {
  session.logout();
}

function openLogoutPrompt() {
  showLogoutPrompt.value = true;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="justify-start flex items-center">
          <q-avatar>
            <q-icon name="dashboard" />
          </q-avatar>
          Dashboard
          <q-space></q-space>
          <q-btn flat icon="logout" @click="openLogoutPrompt" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container class="row justify-center justify-md-evenly">
      <div class="col-lg-2 col-0" />
      <div class="col-lg-3 col-md-5 col-11">
        <q-card class="contentCard">
          <q-card-section>
            <Organization />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-3 col-md-5 col-11">
        <q-card class="contentCard">
          <q-card-section>
            <EventList />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-2 col-0" />
    </q-page-container>
    <q-dialog persistent transition-show="scale" v-model="showLogoutPrompt">
      <q-card>
        <q-card-section>
          <div class="text-h6">Are you sure you want to logout?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            @click="showLogoutPrompt = false"
          />
          <q-btn flat label="Logout" color="primary" @click="logout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
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

.contentCard {
  margin-top: 2em;
}
</style>
