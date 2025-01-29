<script lang="ts" setup>
import type { electionInfoInterface } from '@/interface/election.interface';
import { getElectionInfoDataService } from '@/services/election/election.info.services';
import { onMounted, ref } from 'vue';


const ElectionInfoData = ref<electionInfoInterface[]>([])

onMounted(()=>{
  fetchElectionInfo()
})

const fetchElectionInfo = async ()=> {
  
  const response = await getElectionInfoDataService();
  console.log("Election Info Data : ", response.data)
  ElectionInfoData.value = response.data.data 
}

const electionInfoDataColumn = [
  {
    title:"Election Information Name",
    dataIndex:"election_info_name"
  },
  {
    title:"নির্বাচনের নাম",
    dataIndex:"election_info_name_ban"
  },
  {
    title:"মোট ভোটার",
    dataIndex:"total_voter"
  },
  {
    title:"মোট ভোট",
    dataIndex:"total_votes"
  },
]

</script>

<template>
  <a-card
    title="নির্বাচন সমূহ ... "
  >
  <a-table
    :dataSource="ElectionInfoData"
    :columns="electionInfoDataColumn"
  ></a-table>
  </a-card>

</template>