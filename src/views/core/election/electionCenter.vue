<script lang="ts" setup>
import type { addressInterface, districtListInterface, divisionListInterface, unionListInterface, upzillahListInterface, wordListInterface } from '@/interface/common.interface';
import type { electionCenterInterface } from '@/interface/election.interface';
import { addressCreateService, getAddressListService, getDistrictDetailsService, getDistrictListService, getDivisionDetailsService, getDivisionListService, getUnionListService, getUpzillahListService, getWordListService } from '@/services/common.services';
import { electionCenterCreateService, electionCenterListDataService } from '@/services/election/election-center.services';
import { message } from 'ant-design-vue';
import { options } from 'node_modules/axios/index.cjs';
import { computed, onMounted, reactive, ref, render } from 'vue'


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
      getElectionCenterData.value = response.data.data || []
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
  getAddressList()

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
    title: "Address Details",
    dataIndex: "address_details", // Maps to the "address_details" field
    key: "address_details",
    customRender: ({ text }: any) => {
      if (!text) return "N/A";

      return `
        Line1: ${text.line1 || "N/A"}, 
        Division: ${text.division || "N/A"}, 
        District: ${text.district || "N/A"}, 
        Upazila: ${text.upazila || "N/A"}, 
        Union: ${text.union || "N/A"}, 
        Ward: ${text.ward || "N/A"}
      `;
    },
  },
  {
    title: "Address Details 2",
    dataIndex: "address_details", // Maps to the "address_details" field
    key: "address_details",
    customRender: async ({ text }: any) => {
      if (!text) return "N/A";
      const response = await getDivisionDetailsService(text.division)
      console.log("response data from table render : ", response.data)
      const divisionName = response.data.division_name
      console.log("response selected value : ", divisionName)
      return `
        Line1: ${text.line1 || "N/A"}, 
         
        District: ${text.district || "N/A"}, 
        Upazila: ${text.upazila || "N/A"}, 
        Union: ${text.union || "N/A"}, 
        Ward: ${text.ward || "N/A"}
      `;
    },
  },
  {
    title: 'Action',
    key: 'actions',
    slots: { customRender: 'actions' },
  }
]


// election create form 

const onFinishCenterCreateForm = async (values: electionCenterInterface) => {
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
const addresList = ref(<addressInterface[]>[]);

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



// create full address

const onFinishAddressCreateForm = async (values: addressInterface) => {
  try {
    console.log("submitted value :", values)
    const response = await addressCreateService(values)
    console.log("Address create response :", response?.data)
  } catch (error) {
    console.log(error)
  }

}


// now get full address 

const getAddressList = async () => {
  try {

    const response = await getAddressListService()
    console.log(response)
    if (response.status === 200) {
      addresList.value = response.data.data

    } else {
      message.error("Address response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on Address !!!")
  }
}


const addressOptions = computed(() => {
  return addresList.value.map((address) => {
    const division = divisionList.value.find((d) => d.id === address.division_id);
    const district = districtList.value.find((d) => d.id === address.district_id);
    const upzillah = upazilaList.value.find((d) => d.id === address.upazila_id);

    console.log("Address : ", division)
    console.log("Address : ", district)
    console.log("Address : ", upzillah)
    return {
      label: `${address.line1}, ${district?.district_name || 'Unknown District'}, ${division?.division_name || 'Unknown Division'}`,
      value: address.id,
    };
  });
});



</script>



<template>
  <a-row class="flec flex-row justify-center items-center">
    <a-col :span="18">
      <a-row :gutter="16" class="flex flex-row justify-between p-3">
        <a-col class="gutter-row" :span="12">
          <a-card :headStyle="{ borderBottom: '2px solid #1890ff' }">
            <a-form @finish="onFinishCenterCreateForm" :model="electionCenterFrom" :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }" labelAlign="left">
              <a-form-item label="Center Name" name="center_name">
                <a-input v-mode:value="electionCenterFrom.center_name"></a-input>
              </a-form-item>
              <a-form-item label="কেন্দ্রের নাম" name="center_name_ban">
                <a-input v-mode:value="electionCenterFrom.center_name_ban"></a-input>
              </a-form-item>
              <a-form-item label="ঠিকানা নির্বাচন করুন" name="center_name_ban">
                <a-select>
                  <a-select-option key="" v-model:value="electionCenterFrom.address"
                    :options="addressOptions"></a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit"> Save</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>




        <a-col class="gutter-row" :span="12">
          <a-card title="ঠিকানা খুজে না পাওয়া গেলে ,এখানে তৈরী করুন..."
            :headStyle="{ borderBottom: '2px solid #1890ff' }">
            <a-form :model="addressCreateFrom" name="createAddress" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              labelAlign="left" @finish="onFinishAddressCreateForm">

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
                <a-input v-model:value="addressCreateFrom.line1"></a-input>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit"> Save</a-button>
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

      <a-card title="Election Center List" :headStyle="{ borderBottom: '2px solid #1890ff' }">
        <a-table :dataSource="getElectionCenterData" :columns="electionCenterDataColumns" class="w-full"
          :pagination=false rowKey="id" size="size" />
      </a-card>

    </div>
  </div>
</template>