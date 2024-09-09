<template>
  <a-card>
    <a-form :model="countryForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Country Name" name="country_name"
        :rules="[{ required: true, message: 'Please input Country Name!' }]">
        <a-input v-model:value="countryForm.country_name" />
      </a-form-item>

      <a-form-item label="দেশের নাম" name="country_name_ban"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input v-model:value="countryForm.country_name_ban" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { countryAddService } from "../../services/common.services";
import { message } from 'ant-design-vue';

interface FormState {
  country_name: string;
  country_name_ban: string;

}

const countryForm = reactive<FormState>({
  country_name: '',
  country_name_ban: '',
});
const onFinish = async (values: any) => {
  console.log('Success:', values);
  try {
    const res = await countryAddService(values);
    if (res.status === 201) {
      message.success("Successfully created country");
      resetForm();
    }
  } catch (er) {
    message.error("Inernal server error");
  }

};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const resetForm = () => {
  countryForm.country_name = "";
  countryForm.country_name_ban = ""
}
</script>