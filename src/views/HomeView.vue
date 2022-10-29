<script setup lang="ts">
import { useSessionStore } from "@/stores/session";
import { ref } from "vue";
import EventList from "@/components/EventList.vue";
import Organization from "@/components/Organization.vue";
import DialogModal from "@/components/DialogModal.vue";
import CustomCard from "@/components/CustomCard.vue";
import PageWithHeader from "@/components/PageWithHeader.vue";

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
  <PageWithHeader
    icon="dashboard"
    title="Dashboard"
    rightIcon="logout"
    @rightButtonClicked="openLogoutPrompt"
  >
    <div class="col-lg-2 col-0" />
    <div class="col-lg-3 col-md-5 col-11">
      <CustomCard class="contentCard">
        <Organization />
      </CustomCard>
    </div>
    <div class="col-lg-3 col-md-5 col-11">
      <CustomCard class="contentCard">
        <EventList />
      </CustomCard>
    </div>
    <div class="col-lg-2 col-0" />
  </PageWithHeader>
  <DialogModal
    v-model="showLogoutPrompt"
    title="Are you sure you want to log out?"
    firstButtonText="Cancel"
    secondButtonText="Logout"
    @cancel="showLogoutPrompt = false"
    @confirm="logout"
  />
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

header {
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
