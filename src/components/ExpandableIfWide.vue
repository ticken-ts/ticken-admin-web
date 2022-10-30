<template>
  <q-expansion-item
    v-if="expandable"
    label="Details"
    icon="info"
    expand-separator
  >
    <CustomCard>
      <slot />
    </CustomCard>
  </q-expansion-item>
  <slot v-else />
</template>

<script setup lang="ts">
import CustomCard from "@/components/CustomCard.vue";
import { onMounted, ref } from "vue";

const expandable = ref(false);

onMounted(() => {
  window.onresize = () => {
    expandable.value = window.innerWidth < 1024;
  };
});
</script>

<style scoped lang="scss"></style>
