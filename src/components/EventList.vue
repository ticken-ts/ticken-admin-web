<template>
  <h5 class="title">Events</h5>
  <q-card v-for="event in events" :key="event.id" class="eventCard">
    <q-card-section>
      <div class="text-h6">{{ event.name }}</div>
      <div class="text-subtitle2">{{ event.description }}</div>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Edit" color="primary" @click="editEvent(event.id)" />
      <q-btn flat label="Delete" color="primary" @click="deleteEvent(event.id)" />
    </q-card-actions>
  </q-card>
</template>

<script setup>

const events = [
  {
    id: 1,
    name: "Event 1",
    description: "This is the first event",
  },
  {
    id: 2,
    name: "Event 2",
    description: "This is the second event",
  },
  {
    id: 3,
    name: "Event 3",
    description: "This is the third event",
  },
];

function editEvent(id) {
  console.log("Edit event with id: " + id);
}

function deleteEvent(id) {
  console.log("Delete event with id: " + id);
}
</script>

<style scoped>
.title {
  margin-bottom: 1em;
}
.eventCard {
  margin-bottom: 1rem;
}
</style>
