<template>
 <section class="app-dashboard">
    <a-row :gutter="16" class="gap-3">
      <a-col 
      :span="18" 
      class="rounded-sm border border-s-teal-400"
      >
     
      <a-card>
        Dashboard
      </a-card>
    </a-col>
     <a-col 
     :span="4" 
     class="" 
     >
     <v-row  justify="center" dense>
      <v-col cols="auto">
        <ActiveVotingCard/>
      </v-col>
      <v-col cols="auto">
        <UpcomingVotingCard/>
      </v-col>
     </v-row>
    </a-col>
    </a-row>
  </section>
</template>

<script setup lang="ts">
import ActiveVotingCard from "@/ui/dashboard/ActiveVotingCard.vue"
import UpcomingVotingCard from "@/ui/dashboard/UpcomingVotingCard.vue";

</script>