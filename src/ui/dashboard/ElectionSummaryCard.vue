<script lang="ts" setup>
import type {  electionInfoInterface } from '@/interface/election.interface';
import { getElectionDataListService } from '@/services/election/election.data.services';
import { getElectionInfoDataService } from '@/services/election/election.info.services';
import { onMounted, ref } from 'vue';



const electionIndoData = ref(<electionInfoInterface[]>[])

onMounted(()=>{
  fetchElectionData()
})


const fetchElectionData = async () =>{
  try{
    const response = await getElectionInfoDataService()
    console.log("Election Info : " , response.data)
    electionIndoData.value = response.data.data
  }catch(error){
    console.log(error)
  }
} 


const electionInfoColumn = [
  {
    title:"ক্রমিকঃ",
    dataIndex:"id"
  },
  {
    title:"নির্বাচনের নাম ",
    dataIndex:"election_info_name_ban"
  },
  {
    title:"মোট ভোটার সংখ্যা",
    dataIndex:"total_voter"
  },
  {
    title:"মোট প্রাপ্ত ভোট",
    dataIndex:"total_votes"
  },
  {
    title:"নিরর্বাচনের ধরণ",
    dataIndex:"election_type"
  },
  {
    title:"প্রার্থী",
    dataIndex:"candidates"
  },
  {
    title:"দল",
    dataIndex:"parties"
  },
  {
    title:"মাঠ কর্মী",
    dataIndex:"workers"
  }
]

</script>
<template>
  <a-table
    :dataSource="electionIndoData"
    :columns="electionInfoColumn"
  >
  </a-table>
</template>