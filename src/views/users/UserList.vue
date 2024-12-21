

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
const isEditing = ref(false);
import { UserCreateService, UserListService } from '@/services/GeneralUser.services';
import type { GeneralUserInterface } from '@/interface/user.interface';
import { message } from 'ant-design-vue';

const userCreateFrom = reactive<GeneralUserInterface>({
  username:'',
  phone:'',
  email:'',
  user_type:0,
  party:0,
  password:''
})



const columns = [
  {
    title: 'S/L',
    dataIndex: 'id',
    key: 'id',
    width: '2%',
    align: 'center'
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    width: '35%'
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
    width: '8%'
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    width: '20%'
  },
  {
    title: 'ধরণ',
    dataIndex: 'user_type_name',
    key: 'user_type',
    width: '20%'
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: '15%'
  },
];

const userListData = ref<GeneralUserInterface[]>([]);

const fetchUserList = async () => {
  try {
    const response = await UserListService()
    userListData.value = response;
  } catch (error) {
    console.error('Error fetching user List:', error);
  }
};

onMounted(() => {
  fetchUserList();
});

const formErrors = reactive<Record<string, string[]>>({});

const onFormSubmit = async (values:GeneralUserInterface)=>{
  try{
    console.log("Submitted value",values)
    const response = await UserCreateService(values)
    if(response.status===200){
      console.log("RESPONSE VALUE :",response)
      fetchUserList()
      message.success(response.data.msg)
      
    }else{
      message.error(response.data.msg || "An error occurred");
    }
  }catch(error:any){

    if (error.response && error.response.data) {
      const validationErrors = error.response.data;
      Object.keys(validationErrors).forEach((key) => {
        const fieldErrors = validationErrors[key];
        fieldErrors.forEach((errorMessage: string) => {
          message.error(`${key}: ${errorMessage}`);
        });
      });
    } else {
      message.error("An unexpected error occurred.");
    }
    
    console.error(error);
    
  }
  
}
</script>

<template>
  <a-card title="User Create">
    <a-form :model="userCreateFrom" name="userCreateForm" @finish="onFormSubmit">
      <a-space>
        <a-form-item label="phone" name="phone" :rules="[{ required: true, message: 'Please input phone number!' }]">
          <a-input v-model:value="userCreateFrom.phone"></a-input>
        </a-form-item>
        <a-form-item label="username" name="username" :rules="[{ required: true, message: 'Please input username!' }]">
          <a-input v-model:value="userCreateFrom.username"></a-input>
        </a-form-item>
        <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input password!' }]">
          <a-input-password v-model:value="userCreateFrom.password"></a-input-password>
        </a-form-item>
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input Email!' }]">
          <a-input v-model:value="userCreateFrom.email" ></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Create User' }}</a-button>
      </a-form-item>
      </a-space>
    </a-form>
  </a-card>
  <div class="flex flex-row justify-center items-top h-screen bg-gray-100 p-6">
    <a-card title="ব্যবহারকারী গণ" class="w-full max-w-4xl text-2xl">
      <a-table :columns="columns" :dataSource="userListData" rowKey="id" bordered :pagination='false' />
    </a-card>
  </div>
</template>


<style scoped>
.h-screen {
  height: 100vh;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.w-full {
  width: 100%;
}

.max-w-4xl {
  max-width: 56rem;
}

.p-6 {
  padding: 1.5rem;
}
</style>