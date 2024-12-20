<template>
  <a-card title="User Create">
    <a-form>
      <a-space>
        <a-form-item label="phone" name="phone">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="username" name="username">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="Password" name="password">
          <a-input-password></a-input-password>
        </a-form-item>
        <a-form-item label="Email" name="email">
          <a-input  ></a-input>
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

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const isEditing = ref(false);
import { UserListService } from '@/services/GeneralUser.services';
import type { GeneralUserInterface } from '@/interface/user.interface';

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
</script>

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