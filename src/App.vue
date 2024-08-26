<script setup lang="ts">
import { RouterView } from "vue-router";
import '@/assets/base.css'
</script>

<template>

  
  <Private layout>
    <RouterView />
  </Private>
</template>

<style scoped>
@media (min-width: 1024px) {}
</style>