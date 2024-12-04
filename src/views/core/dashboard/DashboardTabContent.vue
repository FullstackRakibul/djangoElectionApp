<template>
 <section class="app-dashboard">
    <v-row  justify="center" dense>
      <v-col cols="22">
       <ConstituentActiveList/>
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
import ConstituentActiveList from "@/ui/dashboard/ConstituentActiveList.vue";
import UpcomingVotingCard from "@/ui/dashboard/UpcomingVotingCard.vue";

</script>