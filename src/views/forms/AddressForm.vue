<script setup lang="ts">
import type { addressInterface, districtListInterface, divisionListInterface, unionListInterface, upzillahListInterface, wordListInterface } from '@/interface/common.interface';
import { addressCreateService, getDistrictListService, getDivisionListService, getUnionListService, getUpzillahListService, getWordListService } from '@/services/common.services';
import { message } from 'ant-design-vue';
import { computed, onMounted, reactive, ref } from 'vue';


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

onMounted(() => {
  getDivisionList()
  getDistrictList()
  getUpzillahList()
  getUnionList()
  getWordList()
})

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
const onFinishAddressCreateForm = async (values:addressInterface)=>{
  try{
    console.log("submitted value :",values)
    const response = await addressCreateService(values)
    console.log("Address create response :",response?.data)
  }catch(error){
    console.log(error)
  }

}

</script>

<template>
  
   <a-card title="ঠিকানা তৈরী করুন...">
            <a-form :model="addressCreateFrom" name="createAddress" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" labelAlign="left"
              @finish="onFinishAddressCreateForm"
            >
              
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
                <a-button type="primary" html-type="submit"> Save</a-button>
              </a-form-item>
            </a-form>
          </a-card>
  
  <a-card
  title="Address List "
  >
    <a-table>

    </a-table>
  </a-card>
    
</template>