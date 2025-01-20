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
  }
]

</script>

<template>
    <a-card title="Election Data">
    <a-table :dataSource="electionDetails" :columns="electionDetailsColumn" :loading="loading">
    </a-table>
  </a-card>
</template>