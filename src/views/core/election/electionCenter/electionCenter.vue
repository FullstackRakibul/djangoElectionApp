<script lang="ts" setup>
import type { electionCenterInterface } from '@/interface/election.interface';
import { electionCenterCreateService, electionCenterListDataService } from '@/services/election/election-center.services';
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue'


const isEditing = ref(false);


const getElectionCenterData = ref(<electionCenterInterface[]>[])
const electionCenterFrom = reactive<electionCenterInterface>({
  center_name: '',
  center_name_ban: '',
  address: 0
})

const electionCenterListfetch = async () => {
  try {
    const response = await electionCenterListDataService();
    console.log("Election Center List Data", response)
    if (response.status === 200) {
      getElectionCenterData.value = response.data.data
    }
  } catch (error) {
    console.log("election center data fetch error !", error)
  }
}

onMounted(() => {
  electionCenterListfetch()
})

const electionCenterDataColumns = [
  {
    title: "S/L",
    dataIndex: "id"
  },
  {
    title: "Center Name",
    dataIndex: "center_name"
  },
  {
    title: 'Action',
    key: 'actions',
  }
]


// form 

const onFinish = async (values: electionCenterInterface) => {
  const response = await electionCenterCreateService(values);
  if (response.status === 201) {
    getElectionCenterData.value = response.data.data
    electionCenterListfetch()
    message.success("Successfully created country");
  } else {
    message.error('Data Fetch Error')
  }
}

</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Create Voting Center Form -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Create Voting Center</h2>
      <form @submit.prevent="onFinish(electionCenterFrom)" class="space-y-4">
        <div class="flex flex-col space-y-1">
          <label for="center_name" class="text-sm font-medium">Enter Center Name</label>
          <input id="center_name" v-model="electionCenterFrom.center_name" type="text"
            class="w-full p-2  rounded-md focus:ring focus:ring-blue-200" placeholder="Enter center name" required />
        </div>
        <div class="flex flex-col space-y-1">
          <label for="center_name_ban" class="text-sm font-medium">কেন্দ্রের নাম</label>
          <input id="center_name_ban" v-model="electionCenterFrom.center_name_ban" type="text"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="কেন্দ্রের নাম লিখুন" />
        </div>
        <div class="flex flex-col space-y-1">
          <label for="address" class="text-sm font-medium">Address</label>
          <input id="address" v-model="electionCenterFrom.address" type="number"
            class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            placeholder="Enter address" required />
        </div>
        <div class="text-right">
          <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Election Center List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Election Center List</h2>
      <a-table :dataSource="getElectionCenterData" :columns="electionCenterDataColumns" class="w-full" />
    </div>
  </div>
</template>