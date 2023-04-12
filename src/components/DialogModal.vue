<template>
  <q-dialog persistent transition-show="scale" :model-value="modelValue" @input="$emit('update:modelValue')">
    <q-card>
      <q-card-section>
        <p class="text-h6">{{ title }}</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          :label="firstButtonText"
          color="primary"
          @click="$emit('cancel')"
        />
        <q-btn flat :label="secondButtonText" color="primary" @click="$emit('confirm')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  firstButtonText: {
    type: String,
    required: true,
  },
  secondButtonText: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["cancel", "confirm", "update:modelValue"]);
</script>

<style scoped lang="scss">

</style>
