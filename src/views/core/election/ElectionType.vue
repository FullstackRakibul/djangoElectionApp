
<script lang="ts" setup>
import type { electionSeatInterface } from '@/interface/election.interface';
import { getElectionTypeService } from '@/services/election/election.type.services';
import { onMounted, ref } from 'vue';

const ElectionTypeData = ref<electionSeatInterface[]>([])


// on mount 
onMounted(()=>{
  fetchElectionType()
})

const fetchElectionType = async ()=>{
  const response = await getElectionTypeService()
  ElectionTypeData.value = response.data.data
}

const ElectionTypeColumn =[
  {
    title:"Type Name",
    dataIndex:"election_type_name"
  }
]

</script>

<template>
  <a-card
    title="Election Type"
  >
  <a-table
  :dataSource="ElectionTypeData"
  :columns="ElectionTypeColumn"
  ></a-table>

  </a-card>
</template>