<script lang="ts" setup>
import type { addressInterface, districtListInterface, divisionListInterface } from '@/interface/common.interface';
import type { electionCenterInterface } from '@/interface/election.interface';
import { getDistrictListService, getDivisionListService } from '@/services/common.services';
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

const addressCreateFrom = reactive<addressInterface>({
  line1: '',
  division_id: 0,
  district_id: 0,
  upazila_id: 0,
  union_id: 0,
  ward_id: 0,
  city_corporation_id: 0,
  municipality_id: 0
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
  getDivisionList()
  getDistrictList()
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
    slots: { customRender: 'actions' },
  }
]


// form 

const onFinish = async (values: electionCenterInterface) => {
  const response = await electionCenterCreateService(values);
  if (response.status === 201) {
    getElectionCenterData.value = response.data.data
    electionCenterListfetch()
    message.success("Successfully created Center");
  } else {
    message.error('Data Fetch Error')
  }
}


// address part 



const divisionList = ref(<divisionListInterface[]>[]);
const districtList = ref(<districtListInterface[]>[]);

const getDivisionList = async () => {
  try {
    const response = await getDivisionListService()
    if (response.status === 200) {
      divisionList.value = response.data.data
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong !!!")
  }
}

const getDistrictList = async () => {
  try {
    const response = await getDistrictListService()
    if (response.status === 200) {
      districtList.value = response.data.data
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong !!!")
  }
}

</script>

<template>
  <a-row class="flec flex-row justify-center">
    <a-col :span="18">
      <a-row :gutter="16" class="flex flex-row justify-between p-3">
        <a-col class="gutter-row" :span="12">
          <a-card>
            <a-form @onFinish="onFinish" :model="electionCenterFrom" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }" labelAlign="left">
              <a-form-item label="Center Name" name="center_name">
                <a-input v-mode:value="electionCenterFrom"></a-input>
              </a-form-item>
              <a-form-item label="Center Name" name="center_name">
                <a-input v-mode:value="electionCenterFrom.center_name"></a-input>
              </a-form-item>
              <a-form-item label="কেন্দ্রের নাম" name="center_name_ban">
                <a-input v-mode:value="electionCenterFrom.center_name_ban"></a-input>
              </a-form-item>
              <a-form-item label="ঠিকানা নির্বাচন করুন" name="center_name_ban">
                <a-select>
                  <a-select-option key="" value=""></a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>




        <a-col class="gutter-row" :span="12">
          <a-card title="ঠিকানা খুজে না পাওয়া গেলে ,এখানে তৈরী করুন...">
            <a-form :model="addressCreateFrom" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" labelAlign="left">
              <a-form-item label="Select Division" name="division_id">
                <!-- <a-input v-mode:value="addressCreateFrom.division_id"></a-input> -->
                <a-select v-model:value="addressCreateFrom.division_id" showSearch :options="divisionList.map(division => ({
                  label: division.division_name, value: division.id
                }))">

                </a-select>
              </a-form-item>
              <a-form-item label="Select District" name="district_id">
                <a-select v-model:value="addressCreateFrom.district_id" showSearch :options="districtList.map(district => ({
                  label: district.district_name, value: district.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>

      </a-row>
    </a-col>
  </a-row>
  <div class="p-6 space-y-6">


    <!-- Election Center List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-4">Election Center List</h2>
      <a-table :dataSource="getElectionCenterData" :columns="electionCenterDataColumns" class="w-full" :pagination=false
size="size" />

    </div>
  </div>
</template>



<!-- Create Voting Center Form -->
<!-- <div class="bg-white p-6 rounded-lg shadow-md">
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
            class="w-full p-2   rounded-md focus:ring focus:ring-blue-300" placeholder="কেন্দ্রের নাম লিখুন" />
        </div>
        <div class="flex flex-col space-y-1">
          <label for="address" class="text-sm font-medium">Address</label>
          <input id="address" v-model="electionCenterFrom.address" type="number"
            class="w-full p-2 rounded-md focus:ring focus:ring-blue-300" placeholder="Enter address" required />
        </div>
        <div class="text-right">
          <button type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            {{ isEditing ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div> -->