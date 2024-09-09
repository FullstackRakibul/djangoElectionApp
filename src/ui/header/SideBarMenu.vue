<script setup lang="ts">
import { ref, watch  } from 'vue';
import { useRouter } from 'vue-router';
import type { MenuProps } from 'ant-design-vue';
import items from "./menuItems"
// Router instance
const router = useRouter();

// Menu state
const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>([]);

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    // Set selected keys dynamically based on the route
    selectedKeys.value = [newPath];
    // Optionally, set openKeys for submenu collapsing/expanding logic
  },
  { immediate: true }
);

// Handle menu item click
const handleClick: MenuProps['onClick'] = (menuInfo) => {
  const clickedItem = items.value
    .flatMap(item => item.children ? item.children : [item])  // Flatten the structure to find both parent and child items
    .find(item => item.key === menuInfo.key);  // Find the item by key

  if (clickedItem && clickedItem.keyPath) {
    router.push(clickedItem.keyPath);  // Navigate to the correct route
  }
};

</script>

<template>
  <div class="logo">
    <a-image
      :width="45"
      src="https://play-lh.googleusercontent.com/SOoMR6xk74RUyLIo8Ub-fmGgbfdzTQ04UkFeJFRTsjyxfIx0ZwkMrJLlZ6E2d5Fg2-8"
    />
  </div>

  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="vertical"
    :items="items"
    @click="handleClick"
  />
</template>
