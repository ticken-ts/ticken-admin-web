<template>
  <div class="row justify-between items-center">
    <p class="text-h6 vertical-middle">Members</p>
  </div>
  <q-tab-panel name="users">
    <q-table
      flat
      bordered
      :rows="users"
      row-key="id"
      :rows-per-page-options="[5, 10, 15]"
    >
      <template #body="{ row }: { row: User }">
        <q-tr :key="row.username">
          <q-td>
            <q-item>
              <q-item-section>{{ row.organizer_id }}</q-item-section>
            </q-item>
          </q-td>
          <q-td>
            <q-item>
              <q-item-section>{{ row.username }}</q-item-section>
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
</template>

<script setup lang="ts">
import type { User } from "@/endpoints/organization";

defineProps<{ users: User[] }>();
</script>

<style>
.popupCard {
  width: 100%;
}

.spacing {
  margin-top: 10px;
}

.deleteContainer {
  display: flex;
  flex-direction: column;
}
</style>
