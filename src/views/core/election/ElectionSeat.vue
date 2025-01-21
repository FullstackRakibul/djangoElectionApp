<script lang="ts" setup>
import type { electionSeatInterface } from '@/interface/election.interface';
import { getElectionSeatService } from '@/services/election/election.seat.services';
import { onMounted, ref } from 'vue';


const ElectionSeatData = ref<electionSeatInterface[]>([])

onMounted(()=>{
  fetchElectionSeat()
})

const fetchElectionSeat = async ()=>{
  try{
    const response = await getElectionSeatService()
    ElectionSeatData.value = response.data.data
  }catch(error){
    console.log("Error : ",error)
  }
}

const ElectionSeatColumn = [
  {
    title:"Election Seat Name",
    dataIndex:"election_seat_name"
  },
  {
    title:"Election Seat Name",
    dataIndex:"address"
  },
  {
    title:"Election Seat Name",
    dataIndex:"election_center"
  },
]

</script>

<template>
  <a-card
    title="Seat Details "
  >
  <a-table
    :dataSource="ElectionSeatData"
    :columns="ElectionSeatColumn"
  ></a-table>

  </a-card>
</template>