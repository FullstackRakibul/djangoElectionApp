<script lang="ts" setup>
import type { addressInterface, districtListInterface, divisionListInterface, unionListInterface, upzillahListInterface, wordListInterface } from '@/interface/common.interface';
import type { electionCenterInterface } from '@/interface/election.interface';
import { getDistrictDetailsService, getDistrictListService, getDivisionListService, getUnionListService, getUpzillahListService, getWordListService } from '@/services/common.services';
import { electionCenterCreateService, electionCenterListDataService } from '@/services/election/election-center.services';
import { message } from 'ant-design-vue';
import { computed, onMounted, reactive, ref } from 'vue'


const isEditing = ref(false);


const getElectionCenterData = ref(<electionCenterInterface[]>[])
const electionCenterFrom = reactive<electionCenterInterface>({
  center_name: '',
  center_name_ban: '',
  address: 0
})

const addressCreateFrom = reactive<addressInterface>({
  line1: '',
  division_id: 2,
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
  getUpzillahList()
  getUnionList()
  getWordList()
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


// election create form 

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
const upazilaList = ref(<upzillahListInterface[]>[]);
const unionList = ref(<unionListInterface[]>[]);
const wordList = ref(<wordListInterface[]>[]);

const getDivisionList = async () => {
  try {
    const response = await getDivisionListService()
    if (response.status === 200) {
      divisionList.value = response.data.data
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on divison !!!")
  }
}

// district 

const getDistrictList = async () => {
  try {
    
    const response = await getDistrictListService()
    console.log(response)
    if (response.status === 200) {
      districtList.value = response.data.data
     
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on district !!!")
  }
}
const filteredDistrictList = computed(() =>
  districtList.value.filter(
    (district) => district.division === addressCreateFrom.division_id
  )
);

// upzillah 


const getUpzillahList = async () => {
  try {
    
    const response = await getUpzillahListService()
    console.log(response)
    if (response.status === 200) {
      upazilaList.value = response.data.data
     
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on upzillah !!!")
  }
}

const filteredUpzillatList = computed(() =>
  upazilaList.value.filter(
    (upz) => upz.district === addressCreateFrom.district_id
  )
);

// union 

const getUnionList = async () => {
  try {
    
    const response = await getUnionListService()
    console.log(response)
    if (response.status === 200) {
      unionList.value = response.data.data
     
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on upzillah !!!")
  }
}

const filteredUniontList = computed(() =>
  unionList.value.filter(
    (union) => union.upazila === addressCreateFrom.upazila_id
  )
);

// ward

const getWordList = async () => {
  try {
    
    const response = await getWordListService()
    console.log(response)
    if (response.status === 200) {
      wordList.value = response.data.data
     
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on upzillah !!!")
  }
}

const filteredWordList = computed(() =>
  wordList.value.filter(
    (word) => word.union === addressCreateFrom.union_id
  )
);


</script>

<template>
  <a-row class="flec flex-row justify-center items-center">
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
              
              <a-form-item label="বিভাগ নির্বাচন করুন" name="division_id">
                <a-select v-model:value="addressCreateFrom.division_id" showSearch :options="divisionList.map(division => ({
                  label: division.division_name_ban, value: division.id
                }))">

                </a-select>
              </a-form-item>
              <a-form-item label="জেলা নির্বাচন করুন" name="district_id">
                <a-select v-model:value="addressCreateFrom.district_id" showSearch :options="filteredDistrictList.map(district => ({
                  label: district.district_name_ban, value: district.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="উপজেলা নির্বাচন করুন" name="upazila_id">
                <a-select v-model:value="addressCreateFrom.upazila_id" showSearch :options="filteredUpzillatList.map(upz => ({
                  label: upz.upazila_name_ban, value: upz.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="ইউনিয়ন নির্বাচন করুন" name="upazila_id">
                <a-select v-model:value="addressCreateFrom.union_id" showSearch :options="filteredUniontList.map(union => ({
                  label: union.union_name_ban, value: union.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="ওয়ার্ড নির্বাচন করুন" name="ward_id">
                <a-select v-model:value="addressCreateFrom.ward_id" showSearch :options="filteredWordList.map(ward => ({
                  label: ward.ward_name_ban, value: ward.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="হাউজ নাম্বার / গ্রাম / রাস্তা " name="line1">
                <a-input  v-model:value="addressCreateFrom.line1" ></a-input>
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