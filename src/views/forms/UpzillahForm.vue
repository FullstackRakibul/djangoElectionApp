
<script lang="ts" setup >
import type { upzillahListInterface } from '@/interface/common.interface';
import { getUpzillahListService } from '@/services/common.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const getUpzillahList = ref(<upzillahListInterface[]>[])


const UpzillahListFetch = async ()=>{
  try{
    const response = await getUpzillahListService();
    if(response.status===200){
      getUpzillahList.value=response.data.data
      message.success("Upzillah List ...")
    }else{
      message.error("Upzillah Data Fetch Error !!!")
    }
  }catch(error){
    console.log(error)
  }
}

onMounted(()=>{
  UpzillahListFetch()
})

const upzillahListColumns =[
  {
    title:"SL",
    dataIndex:"id"
  },
  {
    title:"Upzillah Name",
    dataIndex:"upazila_name"
  },
  {
    title:"উপজেলার নাম",
    dataIndex:"upazila_name_ban"
  },
  {
    title:"district ID",
    dataIndex:"district"
  },
  {
    title:"Action",
    dataIndex:"actions"
    
  },
]

</script>



<template>
<a-card>
  <a-table
   :dataSource="getUpzillahList"
   :columns="upzillahListColumns"
  >

  </a-table>
</a-card>
</template>