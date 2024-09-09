<script setup lang="ts">
import { reactive } from 'vue';


interface AddressState{
  line1:string,
  division_id:number,
  district_id :number,
  upazila_id : number,
  union_id :number,
  ward_id :number,
  city_corporation_id :number,
  municipality_id :number
}

const AddressForm = reactive<AddressState>({
  line1:'',
  division_id:1,
  district_id :1,
  upazila_id : 1,
  union_id :1,
  ward_id :1,
  city_corporation_id :1,
  municipality_id :1

});


const onSubmit = (values:any)=>{
  console.log(values);
}

</script>

<template>
  <a-card>
    <a-form
      :model="AddressForm"
      name="addressForm"
      :labelCol="{span:8}"
      :wrapperCol="{span:10}"
      @submit="onSubmit"
    >
      <a-form-item
      label="line1"
      name="line1"
      >
      <a-input v-model:value="AddressForm.line1" />
      </a-form-item> 
      <a-form-item
      :wrapper-col="{ offset: 8, span: 16 }"
      >
        <a-button type="primary" htmlType="submit"> Submit </a-button>
      </a-form-item>
    </a-form>
  </a-card>
  
</template>