<script setup lang="ts">
import type { wordListInterface } from '@/interface/common.interface';
import { getWordListService } from '@/services/common.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';



const getWordList = ref(<wordListInterface[]>[])

const fetchWordList = async () => {
  try {
    const res = await getWordListService(); // Await the API response
    console.log("Ward API Response:", res.data); // Log the resolved data
    getWordList.value=res.data.data
    if(res.status===200){
      getWordList.value=res.data.data
      message.success("Word List Fetched ...")
    }
  } catch (error) {
    console.error("Fetch Error:", error); // Handle and log errors
  }
};



onMounted(() => {
  fetchWordList(); // Call the API fetching function on component mount
});

const wordListColumns =[
  {
    title : 'S/L',
    dataIndex :'id'
  },
  {
    title : 'Word Name',
    dataIndex :'ward_name'
  },
  {
    title : 'ওয়ার্ড এর নাম',
    dataIndex :'ward_name_ban'
  },
  {
    title : 'union ID',
    dataIndex :'union'
  },
   {
    title: 'Action',
    key: "actions"
  },
]

</script>

<template>
 <a-card>
  <a-table
    :dataSource="getWordList"
    :columns="wordListColumns"
    :pagination="true"

  >

  </a-table>
 </a-card>
</template>
