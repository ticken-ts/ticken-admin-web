<template>
  <div class="q-pa-md q-mt-auto justify-center container row grid">
    <div class="items-stretch column col-md-8 col-10">
      <p class="text-h3">New Event</p>
      <CustomForm class="column" @submit="addEvent">
        <CustomInput
          v-model="name"
          label="Event Title"
          placeholder="Enter event title"
          :rules="[(val: string) => !!val || 'Name is required']"
        />
        <div class="blankSpace" />
        <q-editor
          v-model="description"
          type="textarea"
          label="Description"
          placeholder="Enter event description"
        />
        <div class="blankSpace" />
        <CustomInput
          label="Date"
          stack-label
          v-model="date"
          type="date"
          :rules="[(val: string) => !!val || 'Date is required']"
        />
        <div class="blankSpace" />
        <CustomInput
          label="Time"
          stack-label
          v-model="time"
          type="time"
          :rules="[(val: string) => !!val || 'Time is required']"
        />
        <div class="blankSpace" />
        <q-file
          label="Poster Image"
          type="file"
          accept="image/*"
          stack-label
          v-model="file"
          :rules="[(val: string) => !!val || 'Poster image is required']"
        />
        <div class="blankSpace" />
        <CustomButton type="submit" color="primary" label="Add Event" />
      </CustomForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomForm from "@/components/CustomForm.vue";
import CustomInput from "@/components/CustomInput.vue";
import { ref, type Ref } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { createEvent } from "@/endpoints/event";
import { useSelectedOrganization } from "@/stores/organization";
import router from "@/router";

const name = ref("");
const description = ref("");
const date = ref(new Date().toISOString().slice(0, 10));
const time = ref(new Date().toLocaleTimeString().slice(0, 5));
const file: Ref<undefined | File> = ref();

const service = useAuthorizedService();
const organization = useSelectedOrganization();

const addEvent = async () => {
  console.log("adding event");
  const eventDate = new Date(date.value);
  const eventTime = time.value.split(":");
  eventDate.setHours(parseInt(eventTime[0]));
  eventDate.setMinutes(parseInt(eventTime[1]));

  await service.call(
    createEvent(organization.id, {
      name: name.value,
      description: description.value,
      date: eventDate,
      time: time.value,
      poster: file.value,
    })
  );
  router.replace({ path: "/" });
};
</script>

<style scoped>
.container {
}

.blankSpace {
  margin-top: 1em;
}
</style>
