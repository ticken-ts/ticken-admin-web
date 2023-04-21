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
          placeholder="Enter event description"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana',
          }"
          :toolbar="[
            [
              {
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                list: 'only-icons',
                options: ['left', 'center', 'right', 'justify'],
              },
              'bold',
              'italic',
              'strike',
              'underline',
              'subscript',
              'superscript',
            ],
            ['token', 'hr', 'link', 'custom_btn'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7',
                ],
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana',
                ],
              },
              'removeFormat',
            ],
            ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

            ['undo', 'redo'],
          ]"
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
import { ref, type Ref, computed } from "vue";
import CustomButton from "@/components/CustomButton.vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { createEvent } from "@/endpoints/event";
import { useSelectedOrganization } from "@/stores/organization";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const name = ref("");
const description = ref("");
const date = ref(new Date().toISOString().slice(0, 10));
const time = ref(new Date().toLocaleTimeString().slice(0, 5));
const file: Ref<undefined | File> = ref();

const service = useAuthorizedService();
const organization = useSelectedOrganization();

const addEventMutation = service.useAuthorizedMutation(
  computed(() => {
    const eventDate = new Date(date.value);
    const eventTime = time.value.split(":");
    eventDate.setHours(parseInt(eventTime[0]));
    eventDate.setMinutes(parseInt(eventTime[1]));
    return createEvent(organization.id, {
      name: name.value,
      description: description.value,
      date: eventDate,
      time: time.value,
      poster: file.value,
    });
  })
);

const q = useQuasar();
const router = useRouter();

const addEvent = async () => {
  console.log("adding event");

  await addEventMutation
    .mutateAsync()
    .then((res) => {
      router.replace({ path: "/" });
      q.notify({
        type: "positive",
        message: "Event added successfully",
      });
      console.log(res);
    })
    .catch(() => {
      q.notify({
        type: "negative",
        message: "Failed to add event",
      });
      return;
    });
};
</script>

<style scoped>
.container {
}

.blankSpace {
  margin-top: 1em;
}
</style>
