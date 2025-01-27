<template>
  <v-card>
    <v-card-title>Vote Trends</v-card-title>
    <v-card-text>
      <v-sparkline
        :value="voteCounts"
        color="blue"
        line-width="2"
        padding="10"
        smooth
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  voteCounts: {
    type: Array,
    required: true,
  },
});
</script>
