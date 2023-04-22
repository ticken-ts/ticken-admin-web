<template>
  <div class="q-pa-md q-mt-auto justify-center container row grid">
    <CustomCard class="items-stretch col-md-6 col-10">
      <GoBack />
      <div class="q-mb-lg q-mt-xs">
        <EventPoster v-if="event" :posterID="event?.poster" />
      </div>
      <div class="row justify-between">
        <div>
          <p class="text-secondary">Title</p>
          <p class="text-h5">{{ event?.name }}</p>
        </div>
        <EventStatusBadge v-if="event" :status="event.status" />
      </div>
      <p class="text-secondary">Date</p>
      <p class="text">{{ moment(event?.date).format("l H:MM") }}</p>
      <q-expansion-item expand-separator label="Description">
        <CustomCard>
          <p v-html="event?.description" />
        </CustomCard>
      </q-expansion-item>
      <q-expansion-item expand-separator label="Sections">
        <CustomCard>
          <div v-for="section in event?.sections" :key="section.name">
            <p class="text-h6">{{ section.name }}</p>
            <p class="text">Price: ${{ section.price }}</p>
          </div>
        </CustomCard>
      </q-expansion-item>
      <div class="q-mt-lg">
        <CustomButton
          v-if="event && event.status === EventStatus.DRAFT"
          class="q-mr-md"
          color="primary"
          label="Set On Sale"
          @click="onSetOnSale"
        />
        <CustomButton
          v-if="event && event.status === EventStatus.ON_SALE"
          class="q-mr-md"
          color="primary"
          label="Set Running"
          @click="setRunning"
        />
        <CustomButton
          v-if="event && event.status === EventStatus.RUNNING"
          class="q-mr-md"
          color="primary"
          label="Set Finished"
          @click="setFinished"
        />
        <AddSectionModal
          v-if="
            event &&
            event.status === EventStatus.DRAFT &&
            !Array.isArray($route.params.organizationID)
          "
          :event="event"
          :organizationID="$route.params.organizationID"
        />
      </div>
    </CustomCard>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { useRoute } from "vue-router";
import {
  getOrganizationEvents,
  type Event,
  EventStatus,
  setEventStatus,
  getPosterUri,
} from "@/endpoints/event";
import { computed } from "vue";
import moment from "moment/moment";
import CustomCard from "@/components/CustomCard.vue";
import CustomButton from "@/components/CustomButton.vue";
import AddSectionModal from "@/components/AddSectionModal.vue";
import "@/views/EventView.css";
import EventStatusBadge from "@/components/EventStatusBadge.vue";
import GoBack from "@/components/GoBack.vue";
import EventPoster from "@/components/EventPoster.vue";

const route = useRoute();

const service = useAuthorizedService();

const getEventsCall = computed(() => {
  if (!Array.isArray(route.params.organizationID)) {
    return getOrganizationEvents(route.params.organizationID as string);
  } else {
    return getOrganizationEvents(route.params.organizationID[0] as string);
  }
});

const events = service.useAuthorizedQuery(getEventsCall);

const event = computed(() => {
  return events.data.value?.find(
    (event: Event) => event.event_id === route.params.eventID
  );
});

const setOnSaleMutation = service.useAuthorizedMutation(
  computed(() =>
    setEventStatus(
      route.params.eventID as string,
      route.params.organizationID as string,
      EventStatus.ON_SALE
    )
  )
);

const setRunningMutation = service.useAuthorizedMutation(
  computed(() =>
    setEventStatus(
      route.params.eventID as string,
      route.params.organizationID as string,
      EventStatus.RUNNING
    )
  )
);

const setFinishedMutation = service.useAuthorizedMutation(
  computed(() =>
    setEventStatus(
      route.params.eventID as string,
      route.params.organizationID as string,
      EventStatus.FINISHED
    )
  )
);

const onSetOnSale = () => {
  setOnSaleMutation.mutate();
};

const setRunning = () => {
  setRunningMutation.mutate();
};

const setFinished = () => {
  setFinishedMutation.mutate();
};
</script>
