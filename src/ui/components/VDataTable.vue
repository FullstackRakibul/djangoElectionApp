<script lang="ts" setup >
import { computed, ref } from 'vue';
import  { type  DataTableHeaderForVoteCount } from '@/interface/election.interface';

// State
const search = ref('')
import type { PropType } from 'vue'
// Props
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})



const headers = ref<DataTableHeaderForVoteCount[]>([
  {
    title: 'Center Name',
    key: 'center_name',
    align: 'start',
    sortable: false
  },
  // ... other headers
])


// Computed
const filteredData = computed(() =>
  props.data.filter(
    item =>
      item.center_name.toLowerCase().includes(search.value.toLowerCase()) ||
      String(item.vote_count).includes(search.value)
  )
)
// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <v-data-table
  :items="filteredData"
  :headers="headers"
  :search="search"
  item-value="id"
  class="elevation-0"
  density="comfortable"
>
  <template v-slot:item.address="{ item }">
          <span>{{ item.address.line1 }}, District {{ item.address.district }}</span>
        </template>

        <template v-slot:item.vote_count="{ item }">
          <v-chip
            :color="item.vote_count > 1000 ? 'green' : 'red'"
            text-color="white"
            variant="flat"
          >
            {{ item.vote_count.toLocaleString() }}
          </v-chip>
        </template>

        <template v-slot:item.last_updated="{ item }">
          <v-icon small class="mr-2">mdi-clock-outline</v-icon>
          {{ formatDate(item.last_updated) }}
        </template>
</v-data-table>
</template>