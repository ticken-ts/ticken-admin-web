<template>
  <div class="row justify-between items-center sectionHeader">
    <p class="text-h5 title text-center no-margin">Events</p>
    <RouterLink to="add-event">
      <q-btn flat icon="add" label="add event" color="primary" />
    </RouterLink>
  </div>
  <q-card
    flat
    bordered
    v-for="event in events"
    :key="event.event_id"
    class="eventCard"
  >
    <q-card-section>
      <p class="text-h6">{{ event.name }}</p>
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
      <AddSectionModal
        v-if="event.status === EventStatus.DRAFT"
        :event="event"
        :organizationID="selectedOrg.id"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useSelectedOrganization } from "@/stores/organization";
import { computed, watch } from "vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { getOrganizationEvents, EventStatus } from "@/endpoints/event";
import moment from "moment/moment";
import AddSectionModal from "./AddSectionModal.vue";

const selectedOrg = useSelectedOrganization();
const service = useAuthorizedService();

watch(
  selectedOrg,
  () => {
    service.call(getOrganizationEvents(selectedOrg.id));
  },
  { immediate: true }
);

const events = computed(() =>
  service.response(getOrganizationEvents(selectedOrg.id))
);
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
