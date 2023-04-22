<template>
  <div class="row justify-between items-center sectionHeader">
    <p class="text-h5 title text-center no-margin">Events</p>
    <RouterLink to="add-event">
      <CustomButton outlined icon="add" label="add event" color="primary" />
    </RouterLink>
  </div>
  <q-card
    flat
    bordered
    v-for="event in events.data.value"
    :key="event.event_id"
    class="eventCard"
  >
    <q-card-section>
      <div class="row justify-between">
        <p class="text-h6">{{ event.name }}</p>
        <EventStatusBadge v-if="event" :status="event.status" />
      </div>
      <div class="row items-center data-item">
        <q-icon size="20px" name="event"></q-icon>
        <p class="text-secondary margin-left">
          {{ moment(event.date).format("MMMM Do YYYY") }}
        </p>
      </div>
      <div class="row items-center data-item">
        <q-icon size="20px" name="schedule"></q-icon>
        <p class="text-secondary margin-left">
          {{ moment(event.date).format("HH:mm") }}
        </p>
      </div>
      <router-link
        :to="{
          path: `/organization/${selectedOrg.id}/event/${event.event_id}`,
        }"
        >Details</router-link
      >
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useSelectedOrganization } from "@/stores/organization";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { getOrganizationEvents } from "@/endpoints/event";
import moment from "moment/moment";
import type { RouterLink } from "vue-router";
import EventStatusBadge from "@/components/EventStatusBadge.vue";
import { storeToRefs } from "pinia";
import { computed, warn, watch } from "vue";
import CustomButton from "./CustomButton.vue";

const selectedOrg = useSelectedOrganization();
const service = useAuthorizedService();

const { id } = storeToRefs(selectedOrg);

watch(id, (newVal, oldVal) => {
  console.log("selected new org: ", newVal);
});

const call = computed(() => {
  return getOrganizationEvents(id.value);
});

const events = service.useAuthorizedQuery(call);
</script>

<style scoped>
.title {
  margin-bottom: 1em;
}
.eventCard {
  margin-bottom: 1rem;
}
.sectionHeader {
  margin-bottom: 1rem;
}
.margin-left {
  margin: 0 0 0 10px;
}
.data-item {
  margin-bottom: 0.5rem;
}
</style>
