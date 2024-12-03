<template>
 <section class="app-dashboard">
    <a-row :gutter="16" class="gap-3">
      <a-col 
      :span="16" 
      class="rounded-sm border border-s-teal-400"
      >
     
      <a-card>
        Dashboard
      </a-card>
    </a-col>
     <a-col 
     :span="7" 
     class="" 
     >
       <ActiveVotingCard/>
       <ActiveVotingCard/>
    </a-col>
    </a-row>
  </section>
</template>

<script setup lang="ts">
import ActiveVotingCard from "@/ui/dashboard/ActiveVotingCard.vue"

</script>