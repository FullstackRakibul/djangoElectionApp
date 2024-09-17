<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterView, useRouter } from "vue-router";
import SideBarMenu from '@/ui/header/SideBarMenu.vue';
import "@/assets/main.css"


const collapsed = ref<boolean>(true);

// Router instance
const router = useRouter();

// Watch for token change and handle login redirection
watchEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push({ name: 'login' });
  }
});
</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed"  :trigger="false" :collapsed-width="80" width="200"
      style="background-color: white;">
      <SideBarMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px', padding: '12px', background: '#fff', overflow: 'auto' }">
        <div style="padding: 10px; min-height:fit-content;">
          <RouterView /> <!-- Main content area -->
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>

<style scoped>
@media (min-width: 1024px) {}
</style>