<template>
 <section >
    <v-row  justify="center" dense>
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
     </v-row>

  </section>
</template>

<script setup lang="ts">
import ActiveVotingCard from "@/ui/dashboard/ActiveVotingCard.vue"
import ElectionSummaryCard from "@/ui/dashboard/ElectionSummaryCard.vue";
import UpcomingVotingCard from "@/ui/dashboard/UpcomingVotingCard.vue";

</script>