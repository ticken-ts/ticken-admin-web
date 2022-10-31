<template>
  <div class="row justify-between items-center">
    <p class="text-h6 vertical-middle">Members</p>
    <CustomButton
      @click="clickAddUser"
      flat
      icon="add"
      color="primary"
      label="Add member"
    />
  </div>
  <q-tab-panel name="users">
    <q-table flat bordered :rows="users" row-key="email" :rows-per-page-options="[5, 10, 15]">
      <template #body="{ row }: { row: { email: string, role: string } }">
        <q-tr :key="row.email" @click="clickViewUser(row)">
          <q-td>
            <q-item>
              <q-item-section>{{ row.email }}</q-item-section>
            </q-item>
          </q-td>
          <q-td>
            <q-item>
              <q-item-section>{{ row.role }}</q-item-section>
            </q-item>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-tab-panel>
  <q-dialog @hide="hideDialog" v-model="showingDialog">
    <div class="row justify-center">
      <CustomCard>
        <p v-if="editing" class="text-h3">Edit member</p>
        <p v-else class="text-h3">New member</p>
        <CustomForm
          @submit="editing ? editUser() : addUser()"
          class="column items-stretch"
        >
          <CustomInput
            v-model="email"
            label="Email"
            type="email"
            :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          />
          <CustomInput
            v-model="role"
            label="Role"
            :rules="[(val) => (val && val.length > 0) || 'Role is required']"
          />
          <CustomButton type="submit" color="primary" label="Save" />
        </CustomForm>
      </CustomCard>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import type { User } from "@/endpoints/organization";
import CustomButton from "@/components/CustomButton.vue";
import { ref } from "vue";
import CustomCard from "@/components/CustomCard.vue";
import CustomForm from "@/components/CustomForm.vue";
import CustomInput from "@/components/CustomInput.vue";

defineProps<{ users: User[] }>();

const showingDialog = ref(false);
const email = ref("");
const role = ref("");
const editing = ref(false);

const showDialog = () => {
  showingDialog.value = true;
};

const hideDialog = () => {
  showingDialog.value = false;
  editing.value = false;
};

const clickViewUser = (user: any) => {
  email.value = user.email;
  role.value = user.role;
  editing.value = true;
  showDialog();
};

const clickAddUser = () => {
  email.value = "";
  role.value = "";
  showDialog();
};

const addUser = () => {
  console.log("adding user", email.value, role.value);
  hideDialog();
};

const editUser = () => {
  console.log("editing user", email.value, role.value);
  hideDialog();
};
</script>

<style>
.popupCard {
  width: 100%;
}
</style>
