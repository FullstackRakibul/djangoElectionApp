<script setup lang="ts">
import { reactive } from 'vue';



interface DesignationForm {
  designation_name :string,
  designation_name_ban: string
}


const designationForm = reactive<DesignationForm>({
  designation_name:'',
  designation_name_ban:''
})


const onFinish = (value:any)=>{
  console.log(value);
}

const onFinishFailed = (errorInfo:any)=>{
  console.log('FAILED !!!',errorInfo.message);
}

</script>

<template>
  <a-card
  title="Create Designation"
  >
  <a-form
  :model="designationForm"
  :label-col="{ span: 8 }"
  :wrapper-col="{ span: 16 }"
  autocomplete="off"
  @finish="onFinish"
  @finishFailed="onFinishFailed"
  >
    <a-form-item
    name="designation_name",
    label="Designation Name"
    >
      <a-input v-model:value="designationForm.designation_name" />
    </a-form-item>
    <!-- <a-form-item
    name="designation_name_ban",
    label="designation_name_ban"
    >
      <a-input v-model:value="designationForm.designation_name_ban" />
    </a-form-item> -->
  </a-form>
  </a-card>

</template>