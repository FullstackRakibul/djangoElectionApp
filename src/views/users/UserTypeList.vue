<template>
  <div class="flex justify-center items-center h-screen bg-gray-100 p-6">
    <a-card title="User Type List" class="w-full max-w-4xl">
      <a-table
        :columns="columns"
        :dataSource="userTypes"
        rowKey="id"
        bordered
        pagination={false}
      />
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { electionHttpJson } from '@/utils/axios/base.Http';
import { reactive } from 'vue';

const userTypes = reactive([
  {
    id: 1,
    user_type_name: "SuperAdmin",
    user_type_name_ban: "সুপার এডমিন"
  },
  {
    id: 2,
    user_type_name: "Admin",
    user_type_name_ban: "এডমিন"
  },
  {
    id: 3,
    user_type_name: "Presiding officer",
    user_type_name_ban: "প্রিসাইডিং অফিসার"
  },
  {
    id: 4,
    user_type_name: "Election Candidate",
    user_type_name_ban: "পদপ্রার্থী"
  }
]);

const columns = reactive([
  {
    title: 'ID',
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
]);

const userTypeData =async()=>{
  try{
    const axiosInstance = electionHttpJson();
    const response = await axiosInstance.get("/account/usertype_list/");
    console.log(response);


  }catch(error){
    console.log(error)
  }
}
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
