<template>
  <div class="">
    <div style="background: #ececec; padding: 30px">




      <a-row :gutter="16">
        <a-col :span="12">
          <a-card>
            <a-statistic title="Student Party" :value="11.28" :precision="2" suffix="%"
              :value-style="{ color: '#3f8600' }" style="margin-right: 50px">
              <template #prefix>
                <arrow-up-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic title="Teacher's Party" :value="9.3" :precision="2" suffix="%" class="demo-class"
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
            <a-statistic title="Worker's Party" :value="20.78" :precision="2" suffix="%" class="demo-class"
              :value-style="{ color: '#cf1322' }">
              <template #prefix>
                <arrow-down-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <a-statistic title="Management Party" :value="56.98" :precision="2" suffix="%"
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