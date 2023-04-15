<template>
  <CustomButton
    outline
    color="primary"
    label="add section"
    @click="viewCredentials"
  />
  <q-dialog
    v-model="showing"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <div class="full-width row grid">
      <CustomCard class="column col-12">
        <CustomForm @submit="onAddSection">
          <CustomInput
            label="Section Name"
            stack-label
            v-model="sectionName"
            :rules="[(val: string) => !!val || 'Section name is required']"
          />
          <div class="row full-width q-mt-lg">
            <CustomInput
              class="col-5"
              type="number"
              label="Section Price"
              stack-label
              v-model="sectionPrice"
              :rules="[(val: string) => !!val || 'Section price is required']"
            />
            <div class="col-2" />
            <CustomInput
              class="col-5"
              type="number"
              label="Total Tickets"
              stack-label
              v-model="totalTickets"
              :rules="[(val: string) => !!val || 'Total tickets is required']"
            />
          </div>
          <CustomButton
            class="q-mt-lg"
            type="submit"
            color="primary"
            label="Add Section"
          />
        </CustomForm>
      </CustomCard>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import { ref } from "vue";
import CustomForm from "./CustomForm.vue";
import CustomInput from "./CustomInput.vue";
import CustomCard from "./CustomCard.vue";
import { addSection, type Event } from "@/endpoints/event";
import { useAuthorizedService } from "@/stores/servicesWithAuth";

const props = defineProps<{
  event: Event;
  organizationID: string;
}>();

const service = useAuthorizedService();

const showing = ref(false);

const sectionName = ref("");
const sectionPrice = ref("");
const totalTickets = ref("");

const viewCredentials = () => {
  showing.value = true;
};

const onAddSection = async () => {
  service.call(
    addSection(props.event.event_id, props.organizationID, {
      name: sectionName.value,
      price: parseInt(sectionPrice.value),
      totalTickets: parseInt(totalTickets.value),
    })
  );
  showing.value = false;
};
</script>
