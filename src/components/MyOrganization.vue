<style>
.selector {
  margin-bottom: 20px;
}
</style>

<template>
  <OrganizationSelector class="selector" />
  <div class="row items-start justify-between">
    <div>
      <p class="text-h5">Organization</p>
      <p>Name: {{ selectedOrgData?.name }}</p>
    </div>
    <OrganizationCredentials />
  </div>
  <ExpandableIfWide>
    <p class="text-h6">Peers</p>
    <q-tab-panel name="peers">
      <q-table
        :columns="[
          {
            name: 'name',
            label: 'NAME',
            field: 'node_name',
            align: 'left',
          },
          {
            name: 'address',
            label: 'ADDRESS',
            field: 'address',
            align: 'left',
          },
        ]"
        flat
        bordered
        :rows="selectedOrgData?.nodes"
        row-key="email"
        :rows-per-page-options="[5, 10, 15]"
      ></q-table>
    </q-tab-panel>
    <UserTable v-if="selectedOrgData" :users="selectedOrgData?.users" />
  </ExpandableIfWide>
</template>

<script setup lang="ts">
import UserTable from "@/components/UserTable.vue";
import ExpandableIfWide from "@/components/ExpandableIfWide.vue";
import OrganizationCredentials from "@/components/OrganizationCredentials.vue";
import OrganizationSelector from "@/components/OrganizationSelector.vue";
import { useSelectedOrganization } from "@/stores/organization";
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { getMyOrganizations } from "@/endpoints/organization";

const service = useAuthorizedService();

const organization = useSelectedOrganization();
const selectedOrgID = storeToRefs(organization).id;

const selectedOrgData = computed(() =>
  service
    .response(getMyOrganizations())
    .find((org) => org.organization_id === selectedOrgID.value)
);
</script>
