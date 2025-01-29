
<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <!-- Main Form Section -->
    <a-row :gutter="[24, 24]" class="mb-6">
      <!-- Election Center Form -->
      <a-col :xs="24" :md="12">
        <a-card
          title="Create Election Center"
          class="shadow-lg rounded-xl"
          :headStyle="{ borderBottom: '2px solid #1890ff' }"
        >
          <a-form
            layout="vertical"
            @finish="handleCreateElectionCenter"
            :model="electionCenterForm"
            ref="electionFormRef"
          >
            <a-form-item
              label="Center Name (English)"
              name="center_name"
              :rules="[{ required: true, message: 'Please enter center name!' }]"
            >
              <a-input
                v-model:value="electionCenterForm.center_name"
                placeholder="Enter center name"
              />
            </a-form-item>

            <a-form-item
              label="কেন্দ্রের নাম (বাংলা)"
              name="center_name_ban"
            >
              <a-input
                v-model:value="electionCenterForm.center_name_ban"
                placeholder="কেন্দ্রের নাম লিখুন"
              />
            </a-form-item>

            <a-form-item
              label="Select Address"
              name="address"
              :rules="[{ required: true, message: 'Please select an address!' }]"
            >
              <a-select
                v-model:value="electionCenterForm.address"
                show-search
                placeholder="Select address"
                :options="addressOptions"
                :loading="loadingAddresses"
              />
            </a-form-item>

            <a-button
              type="primary"
              html-type="submit"
              block
              :loading="creatingCenter"
            >
              Create Center
            </a-button>
          </a-form>
        </a-card>
      </a-col>

      <!-- Address Creation Form -->
      <a-col :xs="24" :md="12">
        <a-card
          title="Create New Address"
          class="shadow-lg rounded-xl"
          :headStyle="{ borderBottom: '2px solid #1890ff' }"
        >
          <a-form
            layout="vertical"
            @finish="handleCreateAddress"
            :model="addressForm"
            ref="addressFormRef"
          >
            <a-form-item
              label="বিভাগ"
              name="division"
              :rules="[{ required: true, message: 'Please select division!' }]"
            >
              <a-select
                v-model:value="addressForm.division"
                show-search
                :options="divisionOptions"
                placeholder="বিভাগ নির্বাচন করুন"
                @change="handleDivisionChange"
              />
            </a-form-item>

            <a-form-item
              label="জেলা"
              name="district"
              :rules="[{ required: true, message: 'Please select district!' }]"
            >
              <a-select
                v-model:value="addressForm.district"
                show-search
                :options="districtOptions"
                placeholder="জেলা নির্বাচন করুন"
                :disabled="!addressForm.division"
                @change="handleDistrictChange"
              />
            </a-form-item>

            <a-form-item
              label="উপজেলা"
              name="upazila"
              :rules="[{ required: true, message: 'Please select upazila!' }]"
            >
              <a-select
                v-model:value="addressForm.upazila"
                show-search
                :options="upazilaOptions"
                placeholder="উপজেলা নির্বাচন করুন"
                :disabled="!addressForm.district"
                @change="handleUpazilaChange"
              />
            </a-form-item>

            <a-form-item
              label="ইউনিয়ন"
              name="union"
              :rules="[{ required: true, message: 'Please select union!' }]"
            >
              <a-select
                v-model:value="addressForm.union"
                show-search
                :options="unionOptions"
                placeholder="ইউনিয়ন নির্বাচন করুন"
                :disabled="!addressForm.upazila"
              />
            </a-form-item>

            <a-form-item
              label="বিস্তারিত ঠিকানা"
              name="line1"
              :rules="[{ required: true, message: 'Please enter address details!' }]"
            >
              <a-input
                v-model:value="addressForm.line1"
                placeholder="রোড/বাড়ি নং/গ্রামের নাম"
              />
            </a-form-item>

            <a-button
              type="primary"
              html-type="submit"
              block
              :loading="creatingAddress"
            >
              Create Address
            </a-button>
          </a-form>
        </a-card>
      </a-col>
    </a-row>

    <!-- Election Center List -->
    <a-card
      title="Election Centers"
      class="shadow-lg rounded-xl"
      :headStyle="{ borderBottom: '2px solid #1890ff' }"
    >
      <a-table
        :dataSource="electionCenters"
        :columns="centerColumns"
        :loading="loadingCenters"
        :pagination="{ pageSize: 8 }"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'address_details'">
            <div class="space-y-1">
              <div class="font-medium">{{ record.address_details?.line1 }}</div>
              <div class="text-gray-600 text-sm">
                {{ formatAddress(record.address_details) }}
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button type="link" size="small">Edit</a-button>
              <a-button type="link" danger size="small">Delete</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';
import type {
  AddressInterface,
  DivisionInterface,
  DistrictInterface,
  UpazilaInterface,
  UnionInterface,
  ElectionCenterInterface
} from '@/interface/common.interface';
import {
  getDivisionList,
  getDistrictList,
  getUpazilaList,
  getUnionList,
  createAddress,
  getAddressList,
  createElectionCenter,
  getElectionCenters
} from '@/services/api';

// Election Center Form
const electionFormRef = ref<FormInstance>();
const electionCenterForm = reactive({
  center_name: '',
  center_name_ban: '',
  address: undefined as number | undefined
});
const creatingCenter = ref(false);

// Address Form
const addressFormRef = ref<FormInstance>();
const addressForm = reactive({
  line1: '',
  division: undefined as number | undefined,
  district: undefined as number | undefined,
  upazila: undefined as number | undefined,
  union: undefined as number | undefined
});
const creatingAddress = ref(false);

// Data Lists
const divisions = ref<DivisionInterface[]>([]);
const districts = ref<DistrictInterface[]>([]);
const upazilas = ref<UpazilaInterface[]>([]);
const unions = ref<UnionInterface[]>([]);
const addresses = ref<AddressInterface[]>([]);
const electionCenters = ref<ElectionCenterInterface[]>([]);

// Loading States
const loadingDivisions = ref(false);
const loadingDistricts = ref(false);
const loadingUpazilas = ref(false);
const loadingUnions = ref(false);
const loadingAddresses = ref(false);
const loadingCenters = ref(false);

// Options for Selects
const divisionOptions = computed(() => 
  divisions.value.map(d => ({
    value: d.id,
    label: d.division_name_ban
  }))
);

const districtOptions = computed(() =>
  districts.value
    .filter(d => d.division_id === addressForm.division)
    .map(d => ({
      value: d.id,
      label: d.district_name_ban
    }))
);

const upazilaOptions = computed(() =>
  upazilas.value
    .filter(u => u.district_id === addressForm.district)
    .map(u => ({
      value: u.id,
      label: u.upazila_name_ban
    }))
);

const unionOptions = computed(() =>
  unions.value
    .filter(u => u.upazila_id === addressForm.upazila)
    .map(u => ({
      value: u.id,
      label: u.union_name_ban
    }))
);

const addressOptions = computed(() =>
  addresses.value.map(a => ({
    value: a.id,
    label: `${a.line1}, ${getDistrictName(a.district_id)}, ${getDivisionName(a.division_id)}`
  }))
);

// Table Columns
const centerColumns = [
  {
    title: 'S/L',
    dataIndex: 'id',
    sorter: (a: ElectionCenterInterface, b: ElectionCenterInterface) => a.id - b.id
  },
  {
    title: 'Center Name',
    dataIndex: 'center_name',
    sorter: (a: ElectionCenterInterface, b: ElectionCenterInterface) => 
      a.center_name.localeCompare(b.center_name)
  },
  {
    title: 'Address Details',
    key: 'address_details'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
];

// Helper Functions
const getDivisionName = (id: number) => 
  divisions.value.find(d => d.id === id)?.division_name_ban || 'N/A';

const getDistrictName = (id: number) =>
  districts.value.find(d => d.id === id)?.district_name_ban || 'N/A';

const formatAddress = (address: AddressInterface) => {
  const parts = [
    address.ward_id ? `ওয়ার্ড: ${address.ward_id}` : '',
    address.union_id ? `ইউনিয়ন: ${address.union_id}` : '',
    address.upazila_id ? `উপজেলা: ${getDistrictName(address.upazila_id)}` : '',
    address.district_id ? `জেলা: ${getDistrictName(address.district_id)}` : '',
    address.division_id ? `বিভাগ: ${getDivisionName(address.division_id)}` : ''
  ].filter(Boolean);

  return parts.join(' • ');
};

// Form Handlers
const handleCreateElectionCenter = async () => {
  try {
    creatingCenter.value = true;
    const response = await createElectionCenter(electionCenterForm);
    electionCenters.value = [response.data, ...electionCenters.value];
    message.success('Election center created successfully!');
    electionFormRef.value?.resetFields();
  } catch (error) {
    message.error('Error creating election center!');
    console.error(error);
  } finally {
    creatingCenter.value = false;
  }
};

const handleCreateAddress = async () => {
  try {
    creatingAddress.value = true;
    const response = await createAddress(addressForm);
    addresses.value = [response.data, ...addresses.value];
    message.success('Address created successfully!');
    addressFormRef.value?.resetFields();
  } catch (error) {
    message.error('Error creating address!');
    console.error(error);
  } finally {
    creatingAddress.value = false;
  }
};

// Data Fetching
const loadInitialData = async () => {
  try {
    loadingAddresses.value = true;
    loadingCenters.value = true;

    const [divisionsRes, addressesRes, centersRes] = await Promise.all([
      getDivisionList(),
      getAddressList(),
      getElectionCenters()
    ]);

    divisions.value = divisionsRes.data;
    addresses.value = addressesRes.data;
    electionCenters.value = centersRes.data;
  } catch (error) {
    message.error('Error loading initial data!');
    console.error(error);
  } finally {
    loadingAddresses.value = false;
    loadingCenters.value = false;
  }
};

// Lifecycle Hooks
onMounted(() => {
  loadInitialData();
});
</script>

<style scoped>
.ant-card {
  border-radius: 0.75rem;
  overflow: hidden;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f8fafc !important;
  font-weight: 600;
}

:deep(.ant-select-selector) {
  border-radius: 0.5rem !important;
}

:deep(.ant-input) {
  border-radius: 0.5rem;
}
</style>
<!-- <script lang="ts" setup>
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
  division: 2,
  district: 0,
  upazila: 0,
  union: 0,
  ward: 0,
  city_corporation: 0,
  municipality: 0
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
<<<<<<< HEAD

const onFinishAddressCreateForm = async (values: addressInterface) => {
  try {
    console.log("submitted value :", values)
=======
const onFinishAddressCreateForm = async (values:addressInterface)=>{
  try{
    console.log("submitted value :",values)
>>>>>>> 5902143 (type page update)
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


<<<<<<< HEAD
const addressOptions = computed(() => {
  return addresList.value.map((address) => {
    const division = divisionList.value.find((d) => d.id === address.division_id);
    const district = districtList.value.find((d) => d.id === address.district_id);
    const upzillah = upazilaList.value.find((d) => d.id === address.upazila_id);
=======
const addressOptions =  computed(() => {
  return  addresList.value.map((address) => {
    const division = divisionList.value.find((d) => d.id === address.division);
    const district = districtList.value.find((d) => d.id === address.district);
    const upzillah = upazilaList.value.find((d) => d.id === address.upazila);
>>>>>>> 5902143 (type page update)

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
<<<<<<< HEAD
          <a-card title="ঠিকানা খুজে না পাওয়া গেলে ,এখানে তৈরী করুন..."
            :headStyle="{ borderBottom: '2px solid #1890ff' }">
            <a-form :model="addressCreateFrom" name="createAddress" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }"
              labelAlign="left" @finish="onFinishAddressCreateForm">

              <a-form-item label="বিভাগ নির্বাচন করুন" name="division_id">
                <a-select v-model:value="addressCreateFrom.division_id" showSearch :options="divisionList.map(division => ({
=======
          <a-card title="ঠিকানা খুজে না পাওয়া গেলে ,এখানে তৈরী করুন..." :headStyle="{ borderBottom: '2px solid #1890ff' }">
            <a-form :model="addressCreateFrom" name="createAddress" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" labelAlign="left"
              @finish="onFinishAddressCreateForm"
            >
              
              <a-form-item label="বিভাগ নির্বাচন করুন" name="division">
                <a-select v-model:value="addressCreateFrom.division" showSearch :options="divisionList.map(division => ({
>>>>>>> 5902143 (type page update)
                  label: division.division_name_ban, value: division.id
                }))">

                </a-select>
              </a-form-item>
              <a-form-item label="জেলা নির্বাচন করুন" name="district">
                <a-select v-model:value="addressCreateFrom.district" showSearch :options="filteredDistrictList.map(district => ({
                  label: district.district_name_ban, value: district.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="উপজেলা নির্বাচন করুন" name="upazila">
                <a-select v-model:value="addressCreateFrom.upazila" showSearch :options="filteredUpzillatList.map(upz => ({
                  label: upz.upazila_name_ban, value: upz.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="ইউনিয়ন নির্বাচন করুন" name="union">
                <a-select v-model:value="addressCreateFrom.union" showSearch :options="filteredUniontList.map(union => ({
                  label: union.union_name_ban, value: union.id
                }))">
                </a-select>
              </a-form-item>
              <a-form-item label="ওয়ার্ড নির্বাচন করুন" name="ward">
                <a-select v-model:value="addressCreateFrom.ward" showSearch :options="filteredWordList.map(ward => ({
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
</template> -->