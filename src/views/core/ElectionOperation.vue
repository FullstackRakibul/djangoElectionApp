<template>
    <a-row :gutter="16" class="mt-4 justify-center">
    <a-col :span="10">
      <a-card title="Candidate Info">
        <a-meta
          :avatar="demoImage"
          description="descriptionSlot1"
        />
        <a-button htmlType="submit" @click="userTypeData">

        </a-button>
      </a-card>
    </a-col>
    <a-col :span="10">
      <a-card title="Identify As">
        <a-meta
          :avatar="demoImage"
          description="descriptionSlot2"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
import demoImage from '@/assets/media/demoImage.png'
import { electionHttpJson } from '@/utils/axios/base.Http';


const userTypeData =async()=>{
  try{
    const axiosInstance = electionHttpJson();
    const response = await axiosInstance.get("/account/usertype_list/");
    console.log(response);


  }catch(error){
    
  }
} 
</script>