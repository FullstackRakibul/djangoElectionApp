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
    console.log(response);
    if (response.data.access_token) {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      router.push({ name: 'electionOperation' });
    } else {
      console.error('Login failed: No token returned');
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
};


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>
