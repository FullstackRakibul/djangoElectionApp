<template>
  <v-card class="mx-auto" loading title="12 Active Custing...">
    <template v-slot:actions>
      <v-btn 
      prepend-icon="mdi-poll" 
      size="small" 
      :loading="loading"
      @click="loading = !loading"
      >
      See details 
    <template v-slot:loader>
        <v-progress-linear indeterminate></v-progress-linear>
      </template>
    </v-btn>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';



const loading = ref(false)
</script>
