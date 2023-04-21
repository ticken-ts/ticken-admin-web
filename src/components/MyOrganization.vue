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
      <p>MSP ID: {{ selectedOrgData?.msp_id }}</p>
    </div>
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
          {
            name: 'Credentials',
            label: 'CREDENTIALS',
            field: 'node',
            align: 'left',
          },
        ]"
        flat
        bordered
        :rows="selectedOrgData?.nodes"
        row-key="email"
        :rows-per-page-options="[5, 10, 15]"
      >
        <template #body="{ row }: { row: Node }">
          <q-tr :key="row.address">
            <q-td>
              <q-item>
                <q-item-section>{{ row.node_name }}</q-item-section>
              </q-item>
            </q-td>
            <q-td>
              <q-item>
                <q-item-section>{{ row.address }}</q-item-section>
              </q-item>
            </q-td>
            <q-td>
              <q-item>
                <q-item-section>
                  <OrganizationCredentials :node="row" />
                </q-item-section>
              </q-item>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-tab-panel>
    <UserTable v-if="selectedOrgData" :users="selectedOrgData?.users" />
    <p class="text-h6">Validators</p>
    <AddValidator
      v-if="selectedOrgData"
      :organizationID="selectedOrgData?.organization_id"
    />
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
import type { Node } from "@/endpoints/organization";
import AddValidator from "./AddValidator.vue";

const service = useAuthorizedService();

const organization = useSelectedOrganization();
const selectedOrgID = storeToRefs(organization).id;

const myOrganizations = service.useAuthorizedQuery(
  computed(getMyOrganizations)
);

const selectedOrgData = computed(() =>
  myOrganizations.data.value?.find(
    (org) => org.organization_id === selectedOrgID.value
  )
);
</script>
