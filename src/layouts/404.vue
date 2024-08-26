<template>
    <div class="flex flex-col items-center justify-center">
      <a-card class="text-center p-2 border-0">
        <a-result status="404" title="404" sub-title="দুক্ষিত ,এ বিষয়ে কিছু পাওয়া যায়নি "
          style="font-family: 'Hind Siliguri', sans-serif;" />
        <a @click="goHome" style="font-family: 'Hind Siliguri', sans-serif;">
          হোম পেইজে চলে যান ...
        </a>
      </a-card>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .bg-primary-color {
    @apply bg-green-600;
  }
  
  .bg-primary-color-dark {
    @apply bg-green-700;
  }
  </style>