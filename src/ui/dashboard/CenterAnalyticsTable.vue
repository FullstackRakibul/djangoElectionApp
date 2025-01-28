<template>
  <v-container fluid class="bg-gray-50 min-h-screen">
    <!-- Summary Cards -->
    <v-row class="mb-4" dense>
      <v-col cols="12" sm="6" md="3">
        <v-card class="shadow-lg">
          <v-card-text class="d-flex align-center">
            <v-icon color="blue" large class="mr-4">mdi-vote</v-icon>
            <div>
              <div class="text-caption text-gray-600">Total Votes</div>
              <div class="text-h4 font-weight-bold">1.2M</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="shadow-lg">
          <v-card-text class="d-flex align-center">
            <v-icon color="green" large class="mr-4">mdi-checkbox-marked-circle</v-icon>
            <div>
              <div class="text-caption text-gray-600">Centers Reported</div>
              <div class="text-h4 font-weight-bold">84%</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="shadow-lg">
          <v-card-text class="d-flex align-center">
            <v-icon color="purple" large class="mr-4">mdi-account-group</v-icon>
            <div>
              <div class="text-caption text-gray-600">Leading Party</div>
              <div class="text-h4 font-weight-bold">NDA</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="shadow-lg">
          <v-card-text class="d-flex align-center">
            <v-icon color="red" large class="mr-4">mdi-seal</v-icon>
            <div>
              <div class="text-caption text-gray-600">Seats Won</div>
              <div class="text-h4 font-weight-bold">294</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card class="shadow-lg">
          <v-card-title class="text-h6 font-weight-bold">
            আসন ভিত্তিক অনুপাত
          </v-card-title>
          <apexchart
            type="bar"
            height="300"
            :options="seatChartOptions"
            :series="seatSeries"
          ></apexchart>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="shadow-lg">
          <v-card-title class="text-h6 font-weight-bold">
            জেলা ভিত্তিক ভোট অনুপাত 
          </v-card-title>
          <apexchart
            type="pie"
            height="300"
            :options="stateChartOptions"
            :series="stateSeries"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>

    


    <!-- Election Centers Table -->
    <!-- <v-card class="shadow-lg">
      <v-card-title class="text-h6 font-weight-bold">
        Election Centers Analytics
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          label="Search Center"
          prepend-inner-icon="mdi-magnify"
          clearable
          dense
          outlined
          hide-details
          class="mt-4"
        ></v-text-field>
      </v-card-title>
      <VDataTable/>
      
    </v-card> -->
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import apexchart from 'vue3-apexcharts'
import WinningCandidateCard from './WinningCandidateCard.vue'
import VDataTable from '../components/VDataTable.vue'

// Props
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  }
})

// State
const search = ref('')
const winningCandidates = ref([
  {
    name: 'জনাব মোঃ ব্যাক্তি ৫২',
    party: 'ঢাকা উত্তর ',
    constituency: ' উদাহরণ কেন্দ্র নাম্বার ০৮',
    votes: 150234,
    initials: 'JD'
  },
  // Add more candidates...
])

// Chart Configurations
const seatChartOptions = ref({
  chart: { type: 'bar' },
  xaxis: { categories: ['উদাহরণ দল ০১', 'উদাহরণ দল ০২', 'অন্যান্য'] },
  colors: ['#3B82F6', '#10B981', '#6B7280']
})

const seatSeries = ref([{ name: 'Seats', data: [160, 80, 60] }])

const stateChartOptions = ref({
  labels: ['ঢাকা', 'বরিশাল', 'খুলনা', 'রাজশাহী', 'অন্যান্য'],
  colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6B7280']
})

const stateSeries = ref([45, 28, 15, 12, 20])

// Table Headers
const  headers = ref([
  { title: 'Center Name', key: 'center_name' },
  { title: 'Vote Count', key: 'vote_count', align: 'end' },
  { title: 'Address', key: 'address' },
  { title: 'Last Updated', key: 'last_updated' }
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

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1) !important;
}

.bg-gray-50 {
  background-color: #f9fafb;
}
</style>