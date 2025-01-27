<template>
  <v-card>
    <v-card-title>Election Centers Analytics</v-card-title>
    <v-data-table
      :items="data"
      :headers="headers"
      item-value="id"
      class="elevation-1"
      dense
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            label="Search by Center Name"
            class="mx-4"
            clearable
            dense
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:item.address="{ item }:any">
        <span>{{ item.address.line1 }}, District {{ item.address.district }}</span>
      </template>

      <template v-slot:item.vote_count="{ item }:any">
        <v-chip
          :color="item.vote_count > 1000 ? 'green' : 'red'"
          text-color="white"
          small
        >
          {{ item.vote_count.toLocaleString() }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Props
defineProps({
  data: {
    type: Array,
    required: true,
  },
});

// State
const search = ref("");

// Table Headers
const headers = ref([
  { text: "Center Name", value: "center_name" },
  { text: "Vote Count", value: "vote_count" },
  { text: "Address", value: "address" },
  { text: "Last Updated", value: "last_updated" },
]);

// Filtered Data
const filteredData = computed(() =>
  data.filter(
    (item) =>
      item.center_name.toLowerCase().includes(search.value.toLowerCase()) ||
      String(item.vote_count).includes(search.value)
  )
);
</script>
