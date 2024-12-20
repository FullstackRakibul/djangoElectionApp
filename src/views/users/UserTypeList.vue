<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 p-6">
    <a-card title="ব্যবহারকারীর ধরণ" class="w-full max-w-4xl text-2xl">
      <a-table :columns="columns" :dataSource="userTypeData" rowKey="id" bordered :pagination='false' />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import {  UserTypeListService } from '@/services/GeneralUser.services';
import { ref, onMounted } from 'vue';


const columns = [
  {
    title: 'S/L',
    dataIndex: 'id',
    key: 'id',
    width: '10%',
    align: 'center'
  },
  {
    title: 'User Type (English)',
    dataIndex: 'user_type_name',
    key: 'user_type_name',
    width: '45%'
  },
  {
    title: 'User Type (Bengali)',
    dataIndex: 'user_type_name_ban',
    key: 'user_type_name_ban',
    width: '45%'
  }
];

const userTypeData = ref([]);

const fetchUserTypes = async () => {
  try {
    const response = await UserTypeListService()
    userTypeData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching user types:', error);
  }
};

onMounted(() => {
  fetchUserTypes();
});
</script>

<style scoped>
.h-screen {
  height: 100vh;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.w-full {
  width: 100%;
}

.max-w-4xl {
  max-width: 56rem;
}

.p-6 {
  padding: 1.5rem;
}
</style>