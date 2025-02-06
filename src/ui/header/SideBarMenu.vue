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
    selectedKeys.value = [newPath]; // Update the selected keys
  },
  { immediate: true }
);



// Recursive function to find the clicked item in the menu structure
const findMenuItem = (menuItems: typeof items.value, key: string): any => {
  for (const item of menuItems) {
    if (item.key === key) {
      return item;
    }

    if (item.children) {
      const found = findMenuItem(item.children, key);
      if (found) return found;
    }

    
  }
  return null; 
};

// Handle menu item click
const handleClick: MenuProps['onClick'] = (menuInfo) => {
  const key = String(menuInfo.key); // Convert Key to string
  const clickedItem = findMenuItem(items.value, key);

  if (clickedItem && clickedItem.keyPath) {
    router.push(clickedItem.keyPath); // Navigate to the correct route
  } else {
    console.error("Menu item not found or no keyPath specified");
  }
};



</script>


<template>
  <div class="logo">
    <a-image
      :width="45"
      src="https://www.crlibrary.org/sites/default/files/2024-09/vote.png"
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
