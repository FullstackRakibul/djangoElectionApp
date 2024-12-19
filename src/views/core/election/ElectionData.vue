<script lang="ts" setup>
import type { electionDataInterface } from '@/interface/election.interface';
import { getElectionDataListService } from '@/services/election/election.data.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';


const ElectionData = ref(<electionDataInterface[]>[]);
const loading = ref(false);

const fetchElectionData = async () => {
  try {
    loading.value = true;
    const response = await getElectionDataListService();
    if (response.status === 200) {
      ElectionData.value = response.data.data
      message.success("Election Data Success ...");
      loading.value = false
    }
  } catch (error) {
    loading.value = false
    console.log("Election data fetch error ", error)
  }
}

onMounted(() => {
  fetchElectionData()
})


const electionListColumns = [
  {
    title: "Election",
    dataIndex: "election"
  },
  {
    title: "Vote Count",
    dataIndex: "vote_count"
  },
  {
    title: "Last Added By",
    dataIndex: "updated_by"
  },
  {
    title: "Actions",
    dataIndex: "actions"
  },
]

</script>

<template>
  <a-card title="Election Data">
    <a-table :dataSource="ElectionData" :columns="electionListColumns" :loading="loading">
    </a-table>
  </a-card>
</template>