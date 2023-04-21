<template>
  <CustomButton
    filled
    color="primary"
    label="add validator"
    @click="clickAddValidator"
    class="text-caption"
  />
  <q-dialog v-model="showingDialog">
    <CustomCard class="full-width">
      <p class="text-h5">Add Validator</p>
      <CustomForm class="column" @submit="addValidator">
        <CustomInput
          v-model="username"
          label="Username"
          placeholder="Enter new validator username"
          :rules="[(val: string) => !!val || 'Username is required']"
        />
        <CustomInput
          v-model="email"
          label="Email"
          placeholder="Enter new validator email"
          :rules="[(val: string) => !!val || 'Email is required']"
        />
        <CustomInput
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter new validator password"
          :rules="[(val: string) => !!val || 'Password is required']"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'ion-eye-off' : 'ion-eye'"
              class="cursor-pointer"
              @click="togglePassword"
            />
          </template>
        </CustomInput>
        <CustomButton
          :disabled="addValidatorMutation.isLoading.value"
          filled
          color="primary"
          label="add validator"
          type="submit"
        />
      </CustomForm>
    </CustomCard>
  </q-dialog>
</template>

<script setup lang="ts">
import CustomButton from "@/components/CustomButton.vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomInput from "@/components/CustomInput.vue";
import { computed, ref } from "vue";
import CustomForm from "./CustomForm.vue";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { addValidatorCall } from "@/endpoints/organization";
import { useQuasar } from "quasar";

const quasar = useQuasar();

const props = defineProps<{
  organizationID: string;
}>();

const service = useAuthorizedService();

const showingDialog = ref(false);
const username = ref("");
const password = ref("");
const email = ref("");

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const clickAddValidator = () => {
  showingDialog.value = true;
};

const addValidatorMutation = service.useAuthorizedMutation(
  computed(() =>
    addValidatorCall(props.organizationID, {
      username: username.value,
      password: password.value,
      email: email.value,
    })
  )
);

const addValidator = async () => {
  await addValidatorMutation
    .mutateAsync()
    .then(() => {
      quasar.notify({
        type: "positive",
        message: "Validator added successfully",
      });
      showingDialog.value = false;
      username.value = "";
      password.value = "";
      email.value = "";
    })
    .catch(() => {
      quasar.notify({
        message: "Failed to add validator",
        type: "negative",
      });
    });
};
</script>
