<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <!-- Main Form Section -->

    <ElectionCenterCreateForm/>
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
        :pagination="{ pageSize: 10 }"
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
import { ref, reactive, computed, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue'
import type {
  addressInterface,
  divisionListInterface,
  districtListInterface,
  upzillahListInterface,
  unionListInterface,
  wordListInterface
} from '@/interface/common.interface'

import type { electionCenterInterface } from '@/interface/election.interface'
import { electionCenterCreateService, electionCenterListDataService } from '@/services/election/election-center.services'
import { addressCreateService, getAddressListService, getDivisionListService, getUnionListService, getUpzillahListService } from '@/services/common.services'
import { getDistrictListService } from '@/services/district.services'
import ElectionCenterCreateForm from '@/views/forms/election/ElectionCenterCreate.form.vue'
// Lifecycle Hooks
onMounted(() => {
  loadInitialData()
})


// Data Fetching
const loadInitialData = async () => {
  try {
    loadingAddresses.value = true
    loadingCenters.value = false

    const [divisionsRes,  districtRes, upzillahRes, unionRes,centersRes,addressesRes] = await Promise.all([
      getDivisionList(),
      getDistrictList(),
      getUpzillahList(),
      getUnionList(),
      getElectionCenters(),
      getAddressList()
    ])

    divisions.value = divisionsRes
    addresses.value = addressesRes
    districts.value =districtRes
    upazilas.value =upzillahRes
    unions.value = unionRes
    electionCenters.value = centersRes

  } catch (error) {
    message.error('Error loading initial data!')
    console.error(error)
  } finally {
    loadingAddresses.value = false
    loadingCenters.value = false
  }
}


// Election Center Form
const electionFormRef = ref<FormInstance>()
const electionCenterForm = reactive({
  center_name: '',
  center_name_ban: '',
  address: undefined as number | undefined
})
const creatingCenter = ref(false)

// Address Form
const addressFormRef = ref<FormInstance>()
const addressForm = reactive({
  line1: '',
  division: undefined as number | undefined,
  district: undefined as number | undefined,
  upazila: undefined as number | undefined,
  union: undefined as number | undefined,
  ward: undefined as number | undefined
})
const creatingAddress = ref(false)

// Data Lists
const divisions = ref<divisionListInterface[]>([])
const districts = ref<districtListInterface[]>([])
const upazilas = ref<upzillahListInterface[]>([])
const unions = ref<unionListInterface[]>([])
const addresses = ref<addressInterface[]>([])
const electionCenters = ref<electionCenterInterface[]>([])


const divisionList = ref(<divisionListInterface[]>[])
const districtList = ref(<districtListInterface[]>[])
const upazilaList = ref(<upzillahListInterface[]>[])
const unionList = ref(<unionListInterface[]>[])
const wordList = ref(<wordListInterface[]>[])
const addresList = ref(<addressInterface[]>[])

// Loading States
const loadingDivisions = ref(false)
const loadingDistricts = ref(false)
const loadingUpazilas = ref(false)
const loadingUnions = ref(false)
const loadingAddresses = ref(false)
const loadingCenters = ref(false)

// Options for Selects Address Create Form 
const divisionOptions = computed(() => 
  divisions.value.map(d => ({
    value: d.id,
    label: d.division_name_ban
  }))
)

const districtOptions = computed(() =>
  districts.value
    .filter(d => d.division === addressForm.division)
    .map(d => ({
      value: d.id,
      label: d.district_name_ban
    }))
)

const upazilaOptions = computed(() =>{
  console.log("Upazillah option for Create form : ",upazilas.value ,addressForm.district  )
  upazilas.value
    .filter(u => u.district === addressForm.district)
    .map(u => ({
      value: u.id,
      label: u.upazila_name_ban
    }))
    }
)

const unionOptions = computed(() =>
  unions.value
    .filter(u => u.upazila === addressForm.upazila)
    .map(u => ({
      value: u.id,
      label: u.union_name_ban
    }))
)

const addressOptions = computed(() =>
  addresses.value.map(a => ({
    value: a.id,
    label: `${a.line1}, ${getDistrictName(a.district)}, ${getDivisionName(a.division)},${getUpzillahName(a.upazila)}`
  }))
)

// Table Columns
const centerColumns = [
  {
    title: 'S/L',
    dataIndex: 'id',
    //sorter: (a: electionCenterInterface, b: electionCenterInterface) => a.id - b.id
  },
  {
    title: 'Center Name',
    dataIndex: 'center_name',
    // sorter: (a: electionCenterInterface, b: electionCenterInterface) => 
    //   a.center_name.localeCompare(b.center_name)
  },
  {
    title: 'Address Details',
    key: 'address_details'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

// Helper Functions
// const getDivisionName = async (id: number) => {
//   const response = await getDivisionListService()
//   divisions.value= response.data.data
//   divisions.value.find(d => d.id === id)?.division_name_ban || 'N/A'
// }

const getDivisionName = (id: number) => {
  return divisions.value.find(d => d.id === id)?.division_name_ban || 'N/A'
}


const getDistrictName = (id: number) => {
  return districts.value.find(d => d.id === id)?.district_name_ban || 'N/A'
}

const getUpzillahName = (id: number) => {
  return upazilas.value.find(u => u.id === id)?.upazila_name_ban || 'N/A'
}
const getUnionName = (id: number) => {
  return upazilas.value.find(u => u.id === id)?.upazila_name_ban || 'N/A'
}
const getWordhName = (id: number) => {
  return upazilas.value.find(u => u.id === id)?.upazila_name_ban || 'N/A'
}

const formatAddress = (address: addressInterface) => {
  const parts = [
    address.ward ? `ওয়ার্ড: ${getWordhName(address.ward)}` : '',
    address.union ? `ইউনিয়ন: ${getUnionName(address.union)}` : '',
    address.upazila ? `উপজেলা: ${getUpzillahName(address.upazila)}` : '',
    address.district ? `জেলা: ${getDistrictName(address.district)}` : '',
    address.division ? `বিভাগ: ${getDivisionName(address.division)}` : ''
  ].filter(Boolean)

  return parts.join(' • ')
}

// Form Handlers
const handleCreateElectionCenter = async () => {
  try {
    creatingCenter.value = true
    const response = await electionCenterCreateService(electionCenterForm)
    electionCenters.value = [response.data.data, ...electionCenters.value]
    console.log('Election Center Data :', electionCenters.value , response.data.data)
    message.success('Election center created successfully!')
    electionFormRef.value?.resetFields()
  } catch (error) {
    message.error('Error creating election center!')
    console.error(error)
  } finally {
    creatingCenter.value = false
  }
}

const handleCreateAddress = async () => {
  try {
    creatingAddress.value = true
    const response = await addressCreateService(addressForm)
    console.log("Create Address Data : " , response.data.data)
    addresses.value = [response.data, ...addresses.value]
    message.success('Address created successfully!')
    addressFormRef.value?.resetFields()
  } catch (error) {
    message.error('Error creating address!')
    console.error(error)
  } finally {
    creatingAddress.value = false
  }
}


 // handel select value changes is address create form 
 // Add Upazila change handler
const handleUpazilaChange = async (upazilaId: number) => {
  // Clear previous union selection
  addressForm.union = undefined;
  
  // Load unions for selected upazila
  // if (upazilaId) {
  //   await loadUnions(upazilaId);
  // }
};

const loadUnions =()=>{

}

// Initial Loading Helper function implement 

const getDivisionList = async () => {
  try {
    const response = await getDivisionListService()
    if (response.status === 200) {
      divisionList.value = response.data.data
      //console.log("initial loading division data : ",response.data.data)
     return response.data.data
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
      //console.log("initial loading district data : ",response.data.data)
      return response.data.data
    } else {
      message.error("Division response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on district !!!")
  }
}
// Upzillah 

const getUpzillahList = async () => {
  try {

    const response = await getUpzillahListService()
    console.log(response)
    if (response.status === 200) {
      upazilaList.value = response.data.data
      //console.log("initial loading upzillah data : ",response.data.data)
      return response.data.data
    } else {
      message.error("Upzillah response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on district !!!")
  }
}
// union 

const getUnionList = async () => {
  try {

    const response = await getUnionListService()
    console.log(response)
    if (response.status === 200) {
      unionList.value = response.data.data
      //console.log("initial loading upzillah data : ",response.data.data)
      return response.data.data
    } else {
      message.error("Uion response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on district !!!")
  }
}

// now get full address 

const getAddressList = async () => {
  try {

    const response = await getAddressListService()
    console.log(response)
    if (response.status === 200) {
      addresList.value = response.data.data
      console.log("initial loading Address data : ",response.data.data)
      return response.data.data
    } else {
      message.error("Address response error !!!")
    }

  } catch (error) {
    console.log("Something went wrong on Address !!!")
  }
}



// election center 

const getElectionCenters = async ()=>{
  const response = await electionCenterListDataService()
  if (response.status===200) {
    electionCenters.value=response.data.data
    console.log("initial loading election center data : ",response.data.data)
    return response.data.data
  }else {
      message.error("Center Is Empty !!!")
    }
}

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