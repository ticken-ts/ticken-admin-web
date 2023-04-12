<script setup lang="ts">
import { useSessionStore } from "@/stores/session";
import { computed, onMounted, ref } from "vue";
import EventList from "@/components/EventList.vue";
import Organization from "@/components/MyOrganization.vue";
import DialogModal from "@/components/DialogModal.vue";
import CustomCard from "@/components/CustomCard.vue";
import PageWithHeader from "@/components/PageWithHeader.vue";
import {getMyOrganizations} from '@/endpoints/organization';
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import CustomButton from "@/components/CustomButton.vue";
import CustomForm from '@/components/CustomForm.vue';
import CustomInput from '@/components/CustomInput.vue';

const showLogoutPrompt = ref(false);

const newOrgName = ref("");

const service = useAuthorizedService();

const myOrganizations = computed(() => service.response(getMyOrganizations()));

const userHasOrganizations = computed(() => myOrganizations.value.length > 0);

onMounted(() => {
  service.call(getMyOrganizations());
});

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
    <div
      v-if="userHasOrganizations"
      class="row col-12 justify-md-evenly justify-center items-start content-start"
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
    </div>
    <div v-else class="col-lg-6 col-md-8 col-11">
      <CustomCard class="contentCard column items-center">
        <div class="flex column items-center">
          <p class="text-h4 text-center">You don't have an organization</p>
          <p class="text-subtitle1 text-center">
            You need to be added to one as a member
          </p>
        </div>
      </CustomCard>
    </div>
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

.input {
  margin-bottom: 20px;
}
</style>
