<template>
  <div class="row justify-between items-center sectionHeader">
    <p class="text-h5 title text-center no-margin">Events</p>
    <q-btn flat icon="add" label="add event" color="primary" to="add-event" />
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
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Edit" color="primary" @click="editEvent(event.id)" />
      <q-btn
        flat
        label="Delete"
        color="primary"
        @click="deleteEvent(event.id)"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useSelectedOrganization } from "@/stores/organization";
import { computed, watch } from "vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { getOrganizationEvents } from "@/endpoints/event";

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
</style>
