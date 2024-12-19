<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterView, useRouter } from "vue-router";
import SideBarMenu from '@/ui/header/SideBarMenu.vue';
import "@/assets/main.css"


const collapsed = ref<boolean>(false);

// Router instance
const router = useRouter();

// Watch for token change and handle login redirection
watchEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push({ name: 'login' });
  }
});

const handleLogout = () => {
  // Clear local storage
  localStorage.clear();
  // Redirect to the login page
  router.push({ name: 'login' });
};
</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" collapsible style="background-color: white;">
      <SideBarMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0; display: flex; justify-content: space-between; align-items: center;">
        <div style="padding-left: 16px; font-family: 'Hind Siliguri', sans-serif;" class=" text-2xl ">নির্বাচনী
          ব্যবস্থাপনা ও ডিজিটাল হিসাব</div>
        <a-dropdown placement="bottomRight" trigger="hover">
          <template #overlay>
            <a-menu>
              <a-menu-item @click="handleLogout">
                Logout
              </a-menu-item>
            </a-menu>
          </template>
          <a-avatar size="large" style="cursor: pointer;">U</a-avatar>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content :style="{ margin: '8px 10px', padding: '5px', background: '#fff', overflow: 'auto' }">
        <div style="min-height:fit-content;">
          <RouterView /> <!-- Main content area -->
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ElectionApp ©2024 Created by Tamal Mazumder
      </a-layout-footer>
    </a-layout>
  </a-layout>

</template>

<style scoped>
@media (min-width: 1024px) {}
</style>