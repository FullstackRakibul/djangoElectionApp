<template>
  <section>
    <div class="flex justify-center items-center h-screen" style="background: #ececec; padding: 30px">
      <a-card 
        title="Login" 
        :bordered="false" 
        style="width: 400px"
      >
        <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
          <a-form-item
            label="Phone"
            name="phone"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <a-input v-model:value="formState.phone" />
          </a-form-item>
          <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">Login</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { electionHttpJson } from '@/utils/axios/base.Http'; 
import axios from 'axios';
import { message } from 'ant-design-vue';

interface FormState {
  phone: string;
  password: string;
}

const formState = reactive<FormState>({
  phone: '',
  password: '',
});

const router = useRouter();

const onFinish = async () => {
  try {
    const axiosInstance = electionHttpJson();
    const data = {
      phone: formState.phone,
      password: formState.password,
    };

    console.log(data);
    const response = await axiosInstance.post('/account/user_login/', data);
    console.log("response data :",response.data);
    if (response.data.access_token) {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      router.push({ name: 'dashboardTabSwitcher' });
    }else {
      console.error('Login failed: No token returned');
      message.error('Invalid Credentials !!!')
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      message.error('Request Error !!!')
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
      console.log(error.message);
      message.error('Database Error !!!')
    } else {
      console.error('Unexpected Error:', error);
      message.error('Unexpected Error !!!')
    }
  }
};


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
