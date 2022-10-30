<template>
  <q-layout view="hHh lpR fFf" class="flex column expand">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="justify-start flex items-center">
          <q-avatar>
            <q-icon :name="icon" />
          </q-avatar>
          {{ title }}
          <q-space></q-space>
          <q-btn v-if="!!rightIcon" flat :icon="rightIcon" @click="$emit('rightButtonClicked')" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="row justify-center justify-md-evenly expand">
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rightIcon: {
    type: String,
    required: false,
  },
});
defineEmits(["rightButtonClicked"]);
</script>

<style scoped lang="scss">
.expand {
  height: 100%;
}
</style>
