<template>

  

  <div class="">
    <div style="padding: 30px">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-card
            :style="{ 
              backgroundImage: 'url(https://cdn.vectorstock.com/i/500p/52/42/gradient-wave-design-background-green-blue-vector-47405242.jpg)', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              color: '#fff'
            }"
          >
            <a-statistic 
             title="Student Party" 
             :value="63.46" 
             :precision="2" 
             suffix="%"
             style="margin-right: 50px;color: beige;"
             :title-style="{ color: '#fff', fontWeight: 'bold' }"
             :value-style="{ color: '#fff', fontWeight: 'bold' }" 
             >
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic title="Teacher's Party" :value="31.19" :precision="2" suffix="%" class="demo-class"
              :value-style="{ color: '#cf1322' }">
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
      <div class="h-4">

      </div>
      <a-row :gutter="16">

        <a-col :span="12">
          <a-card>
            <a-statistic title="Worker's Party" :value="2.01" :precision="2" suffix="%" class="demo-class"
              :value-style="{ color: '#cf1322' }">
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic title="Management Party" :value="4.12" :precision="2" suffix="%"
              :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>


    </div>
  </div>
</template>

<script setup>
import demoImage from '@/assets/media/demoImage.png'
import { electionHttpJson } from '@/utils/axios/base.Http';


const userTypeData = async () => {
  try {
    const axiosInstance = electionHttpJson();
    const response = await axiosInstance.get("/account/usertype_list/");
    console.log(response);


  } catch (error) {

  }
} 
</script>