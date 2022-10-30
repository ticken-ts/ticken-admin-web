<template>
  <PageWithHeader title="Add Event" icon="event">
    <div class="col-md-6 col-sm-8 col-11 justify-center container column">
      <CustomCard class="items-stretch column">
        <p class="text-h3">New Event</p>
        <CustomForm class="column" @submit="addEvent">
          <CustomInput
            v-model="name"
            label="Name"
            placeholder="Enter event name"
            :rules="[(val) => !!val || 'Name is required']"
          />
          <div class="blankSpace" />
          <CustomInput
            v-model="description"
            multiline
            label="Description"
            placeholder="Enter event description"
          />
          <div class="blankSpace" />
          <CustomInput
            label="Date"
            stack-label
            v-model="date"
            type="date"
            :rules="[(val) => !!val || 'Date is required']"
          />
          <div class="blankSpace" />
          <CustomInput
            label="Time"
            stack-label
            v-model="time"
            type="time"
            :rules="[(val) => !!val || 'Time is required']"
          />
          <div class="blankSpace" />
          <CustomButton type="submit" color="primary" label="Add Event" />
        </CustomForm>
      </CustomCard>
    </div>
  </PageWithHeader>
</template>

<script setup>
import PageWithHeader from "@/components/PageWithHeader.vue";
import CustomForm from "@/components/CustomForm.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomCard from "@/components/CustomCard.vue";
import { ref } from "vue";
import CustomButton from "@/components/CustomButton.vue";

const name = ref("");
const description = ref("");
const date = ref(new Date().toISOString().slice(0, 10));
const time = ref(new Date().toLocaleTimeString().slice(0, 5));

const addEvent = () => {
  console.log("adding event");
};
</script>

<style scoped>
.container {
}

.blankSpace {
  margin-top: 1em;
}
</style>
