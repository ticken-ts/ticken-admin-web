<template>
  <q-select
    label="Select Organization"
    class="selector"
    filled
    v-model="selectedOrgID"
    :options="organizationSelectorOptions"
    option-value="value"
    option-label="label"
    emit-value
    map-options
  />
</template>

<script setup lang="ts">
import { useAuthorizedService } from "@/stores/servicesWithAuth";
import { computed, ref, watch } from "vue";
import { getMyOrganizations } from "@/endpoints/organization";
import { useSelectedOrganization } from "@/stores/organization";

const service = useAuthorizedService();
const organizationStore = useSelectedOrganization();

// onMounted(() => {
//   service.call(getMyOrganizations());
// });

const myOrganizations = service.response(getMyOrganizations());

const organizationSelectorOptions = computed(() => {
  if (myOrganizations) {
    return myOrganizations.map((org) => ({
      label: org.name,
      value: org.organization_id,
    }));
  } else {
    return [];
  }
});

const savedSelectedOrgID = organizationStore.id;
const selectedOrgID = ref(
  savedSelectedOrgID || organizationSelectorOptions.value[0]?.value
);
const selectedOrg = computed(() => {
  return myOrganizations?.find(
    (org) => org.organization_id === selectedOrgID.value
  );
});

watch(
  selectedOrg,
  (newVal) => {
    if (newVal) {
      organizationStore.selectOrganization({
        id: newVal.organization_id,
        name: newVal.name,
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss"></style>
