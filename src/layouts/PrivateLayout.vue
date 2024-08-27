<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView, useRouter } from "vue-router";
import {
  ExperimentOutlined,
  UsergroupAddOutlined,
  ReconciliationOutlined,
  DotChartOutlined,
  FundViewOutlined
} from '@ant-design/icons-vue';


const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(true);


onMounted(() => {
  const token = localStorage.getItem('token');
  const router = useRouter();
  if (!token) {
    router.push({ name: 'login' });
  }
});

</script>

<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-sider v-model:collapsed="collapsed" collapsible :trigger="null" :collapsed-width="80" width="200"
      style="background-color: white;">
      <div class="logo">
        <a-image :width="45"
          src="https://play-lh.googleusercontent.com/SOoMR6xk74RUyLIo8Ub-fmGgbfdzTQ04UkFeJFRTsjyxfIx0ZwkMrJLlZ6E2d5Fg2-8" />
      </div>
      <nav>
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
          <a-menu-item key="1">
            <router-link to="/">
              <FundViewOutlined />
              <span>Election Summary </span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/usertype_list">
              <UsergroupAddOutlined />
              <span>User Type List</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/add_country">
              <ExperimentOutlined />
              <span>Add Country</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/operation-dashboard">
              <DotChartOutlined />
              <span>Checking and Evaluation</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="5">
            <router-link to="/operation-dashboard">
              <ReconciliationOutlined />
              <span>Audit Result</span>
            </router-link>
          </a-menu-item>

        </a-menu>
      </nav>
    </a-layout-sider>
    <a-layout>
      <a-layout-content :style="{ margin: '24px 16px', padding: '12px', background: '#fff', overflow: 'auto' }">
        <div style="padding: 10px; min-height:fit-content;">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>

<style scoped>
@media (min-width: 1024px) {}
</style>