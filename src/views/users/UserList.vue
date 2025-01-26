<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
const isEditing = ref(false);
import { UpdateUserService, UserCreateService, UserListService, UserTypeListService } from '@/services/GeneralUser.services';
import type { GeneralUserInterface, GeneralUserTypeInterface } from '@/interface/user.interface';
import { message } from 'ant-design-vue';


// fetch all data

onMounted(() => {
  fetchUserList()
  fetchUserTypeList()
})

const userCreateFrom = reactive<GeneralUserInterface>({
  username: '',
  phone: '',
  email: '',
  user_type: 0,
  party: 0,
  password: ''
})



const columns = [
  {
    title: 'S/L',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
    align: 'center'
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
    width: '38%'
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    key: 'phone',
    width: '10%'
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
const userTypeListData = ref<GeneralUserTypeInterface[]>([]);
const isDeleteModalOpen = ref(false);
const deletingUserId = ref(0);
const editingUserId = ref(0);


const fetchUserList = async () => {
  try {
    const response = await UserListService()
    userListData.value = response;
  } catch (error) {
    console.error('Error fetching user List:', error);
  }
};

const fetchUserTypeList = async  () => {
  try {
    const response = await UserTypeListService();
    console.log("User type list data :", response.data);
    userTypeListData.value = response.data.data


  } catch (error) {
    console.log("Error in user type date fetching : ", error)
  }
}



const formErrors = reactive<Record<string, string[]>>({});

const onFormSubmit = async (values: GeneralUserInterface) => {
  try {
    const response = await UserCreateService(values)
    if (response.statusText = 'Ok') {
      console.log("RESPONSE VALUE :", response)
      userListData.value = response.data.data
      fetchUserList()
      message.success(`${response.data.msg}`)
      userCreateFrom
    } else {
      message.error(response.data.msg || "An error occurred");
    }
  } catch (error: any) {

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
const onEditButtonClick = async (id: number, values: GeneralUserInterface) => {
  isEditing.value = true;
  editingUserId.value = id
  userCreateFrom.username = values.username,
    userCreateFrom.phone = values.phone,
    userCreateFrom.email = values.email
}

const updateUser = async (id: number, values: GeneralUserInterface) => {
  try {
    const response = await UpdateUserService(values, id)
    fetchUserList();
    console.log("Update User Log : ", response)
  } catch (error) {
    console.log("UPDATE ERRO !!!", error)
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


      </a-space>
      <a-space>
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input Email!' }]">
          <a-input v-model:value="userCreateFrom.email"></a-input>
        </a-form-item>
        <a-form-item label="User Type" name="user_type">
        <a-select
          v-model:value="userCreateFrom.user_type"
          show-search
          placeholder="Select User Type"
          style="width: 200px;"
          :options="userTypeListData.map(userType => ({ 
            label: userType.user_type_name,
            value: userType.id
            
          }))"
        />
</a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" size="medium"> {{ isEditing ? 'Update' : 'Create User'
          }}</a-button>
      </a-form-item>
    </a-space>
    </a-form>
  </a-card>
  <div class="flex flex-row justify-center items-top  bg-gray-100 pt-3">
    <a-card title="ব্যবহারকারী গণ" class="w-full text-2xl">
      <a-table :columns="columns" :dataSource="userListData" rowKey="key" bordered :pagination="false"
        :scroll="{ y: 200 }" size="small">
        <template #bodyCell="{ record, column }">
          <template v-if="column.key === 'actions'">
            <div class="flex gap-4">
              <a-button @click="onEditButtonClick(record.id, record)" type="primary" size="small">Edit</a-button>
              <a-button @click="() => {
                isDeleteModalOpen = true;
                deletingUserId = record.id;
              }" danger type="primary" size="small">Delete</a-button>
            </div>
          </template>
        </template>
      </a-table>
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