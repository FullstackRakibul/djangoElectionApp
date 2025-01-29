<template>
 <!-- Winning Candidates -->
     
      <v-row justify="center" dense class="mt-8">
      <!-- Election Centers Analytics Table -->
      <v-col cols="18">
        <WinningCandidateCard/>
      </v-col>
      <!-- <v-col cols="18">
        <WinningCandidateCard/>
      </v-col> -->
    </v-row>
</template>

<script lang="ts" setup >
import WinningCandidateCard from '@/ui/dashboard/WinningCandidateCard.vue';
</script>
