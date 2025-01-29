<template>
 <section >
    <!-- <v-row  justify="center" dense>
      <v-col cols="22">
       <ElectionSummaryCard/>
      </v-col>
      <v-col cols="2">   
        <v-row  justify="center" dense>
         <v-col>
           <ActiveVotingCard/>
         </v-col>
         <v-col>
           <UpcomingVotingCard/>
         </v-col>
        </v-row>
      </v-col>
     </v-row> -->

  

    <!-- Analytics Section -->
    <v-row justify="center" dense class="mt-8">
      <!-- Election Centers Analytics Table -->
      <v-col cols="18">
        <CenterAnalyticsTable :data="analyticsData" />
      </v-col>
    </v-row>

    
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import ActiveVotingCard from "@/ui/dashboard/ActiveVotingCard.vue"
import ElectionSummaryCard from "@/ui/dashboard/ElectionSummaryCard.vue";
import UpcomingVotingCard from "@/ui/dashboard/UpcomingVotingCard.vue";
import VoteTrendChart from "@/ui/dashboard/VoteTrendChart.vue";
import CenterAnalyticsTable from "@/ui/dashboard/CenterAnalyticsTable.vue";

const analyticsData = ref([
  {
    id: 1,
    center_name: "Khagan",
    vote_count: 9223372036854776000,
    is_deleted: true,
    last_updated: "2024-12-18T18:29:22.121706Z",
    address: {
      line1: "1",
      division: 2,
      district: 12,
      upazila: 6,
      union: 2,
      ward: 9,
    },
  },
]);
const voteCounts = ref([100, 120, 150, 200, 180, 230, 300]);
</script>