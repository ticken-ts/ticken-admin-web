<template>
  <div class="row justify-between items-center sectionHeader">
    <p class="text-h5 title text-center no-margin">Events</p>
    <q-btn
      flat
      icon="add"
      label="add event"
      color="primary"
      @click="addEvent"
    />
  </div>
  <q-card
    flat
    bordered
    v-for="event in events"
    :key="event.id"
    class="eventCard"
  >
    <q-card-section>
      <p class="text-h6">{{ event.name }}</p>
      <p class="text-subtitle2">{{ event.description }}</p>
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
    </q-card-section>
  </q-card>
  <q-dialog v-model="showingDialog">
    <AddEvent @onSubmitted="closeDialog" />
  </q-dialog>
</template>

<script setup lang="ts">
import { useSelectedOrganization } from "@/stores/organization";
import { computed, ref, watch } from "vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { getOrganizationEvents } from "@/endpoints/event";
import AddEvent from "@/components/AddEvent.vue";
import moment from "moment/moment";

const showingDialog = ref(false);

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

function addEvent() {
  showingDialog.value = true;
}

function closeDialog() {
  showingDialog.value = false;
}

function editEvent(id: string) {
  console.log("Edit event with id: " + id);
}

function deleteEvent(id: string) {
  console.log("Delete event with id: " + id);
}
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
