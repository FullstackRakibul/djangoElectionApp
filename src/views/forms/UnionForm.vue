<script lang="ts" setup>
import type { unionListInterface } from '@/interface/common.interface';
import { getUnionListService } from '@/services/common.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';


 
const getUnionList = ref(<unionListInterface[]>[])

const fetchUnionList = async ()=>{
  try{
    const response = await getUnionListService();
    if(response.status===200){
      getUnionList.value=response.data.data
      message.success("Union Data Loaded ...")
    }else{
      message.error("Data Fetch Error !!!")
    }

  }catch(error){
    console.log(error)
  }
}

onMounted(()=>{
  fetchUnionList()
})


const unionListColumns =[
  {
    title:"SL",
    dataIndex:"id"
  },
  {
    title:"Union Name",
    dataIndex:"union_name"
  },
  {
    title:"ইউনিয়নের নাম",
    dataIndex:"union_name_ban"
  },
  {
    title:"Upzillah ID",
    dataIndex:"upazila"
  },
  {
    title: 'Action',
    key: "actions"
  },
]

</script>

<template>
  <a-card>
    <a-table
      :dataSource="getUnionList"
      :columns="unionListColumns"
      :pagination="true"
      >
    
    </a-table>
  </a-card>
</template>