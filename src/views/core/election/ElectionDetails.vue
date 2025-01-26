<script lang="ts" setup>
import type {  electionDetailsInterface } from '@/interface/election.interface';
import { GetElectionDetailsDataService } from '@/services/election/election.details.services';
import { onMounted, ref } from 'vue';


onMounted(()=>{
  fetchElectionDetails()
})

// ...............
const electionDetails = ref<electionDetailsInterface[]>([])
const loading = ref(false);


const fetchElectionDetails = async ()=>{
  loading.value = true
  const response = await GetElectionDetailsDataService();
  console.log("Election Details Data :",response.data)
  electionDetails.value = response.data.data
  loading.value = false
}


const electionDetailsColumn = [
  {
    title:"Election Name",
    dataIndex:"election_info_name"
  },
  {
    title:"Election Name",
    dataIndex:"election_info_name_ban"
  },
  {
    title:"Election Name",
    dataIndex:"total_voter"
  },
  {
    title:"Election Name",
    dataIndex:"total_votes"
  },
  {
    title:"Election Type",
    dataIndex:"election_type"
  },
  {
    title:"Election Name",
    dataIndex:"candidates"
  },
  {
    title:"Election Name",
    dataIndex:"parties"
  },
  {
    title:"Election Name",
    dataIndex:"workers"
  },
]

</script>

<template>
    <a-card title="Election Data">
    <a-table :dataSource="electionDetails" :columns="electionDetailsColumn" :loading="loading">
    </a-table>
  </a-card>
</template>