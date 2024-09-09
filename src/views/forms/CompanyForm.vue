<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { countryAddService, getCompanyListService, updateCountryService } from "../../services/common.services";
import { message } from 'ant-design-vue';
import { electionHttpJson } from '@/utils/axios/base.Http';
interface FormState {
  company_name : string;
  company_name_ban: string;
}

const companyList = ref([]);
const isEditing = ref(false);
const editingCompanyId = ref(0);
const isDeleteModalOpen = ref(false);
const deletingCompanyId = ref(0);

const companyForm = reactive<FormState>({
  company_name : '',
  company_name_ban: '',
});
const onFinish = async (values: any) => {
  if (isEditing.value) {
    updateCompnay(values, editingCompanyId.value);
  } else {
    await saveCompany(values)
  }
  await getCompanyList();
};


const saveCompany = async (values: FormState) => {
  try {
    const res = await countryAddService(values);
    if (res.status === 201) {
      message.success("Successfully created Company");
      resetForm();
    }
  } catch (er) {
    message.error("Inernal server error");
  }
}


const updateCompnay = async (values: FormState, id: any) => {
  try {
    const res = await updateCountryService(values, id);
    if (res.status === 200) {
      message.success("Successfully updated the country");
      resetForm();
    }
    isEditing.value = false;
  } catch (er) {
    message.error("Inernal server error");
  }
}


const deleteCompany = async () => {
  const apiInstance = electionHttpJson();
  try {
    const res = await apiInstance.get('/add_company')
    if (res.status === 200) {
      message.success("Successfully deleted the country");
      resetForm();
    }
    deletingCompanyId.value = 0;
    isDeleteModalOpen.value = false;
    await getCompanyList();
  } catch (er) {
    message.error("Inernal server error");
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const resetForm = () => {
  companyForm.company_name = "";
  companyForm.company_name_ban = ""
}

const getCompanyList = async () => {
  try {
    const res = await getCompanyListService();
    if (res.status === 200) {
      companyList.value = res.data.data;
    }
  } catch (err) {
    message.error("Internal server error");
  }
}


const columns = [
  {
    title: 'Country Name',
    dataIndex: 'country_name',
  },
  {
    title: 'Country Name Ban',
    dataIndex: 'country_name_ban',
  },
  {
    title: 'Action',
    key: "actions"
  },
];


const onEditButtonClick = async (id: any, company_name: any, company_name_ban: any) => {
  isEditing.value = true;
  editingCompanyId.value = id;
  companyForm.company_name = company_name;
  companyForm.company_name_ban = company_name_ban
  console.log(id, company_name, company_name_ban)
}

onMounted(() => {
  getCompanyList();
})




</script>

<template>
  <a-card>
    <a-form :model="companyForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Company Name" name="compnay_name"
        :rules="[{ required: true, message: 'Please input Company Name !' }]">
        <a-input v-model:value="companyForm.company_name" />
      </a-form-item>

      <a-form-item label="দেশের নাম" name="country_name_ban"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input v-model:value="companyForm.company_name_ban" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card>
    <a-table :pagination="false" :columns="columns" :data-source="companyForm" bordered>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'actions'">
          <div class="flex gap-4">
            <a-button @click="onEditButtonClick(record.id, record.country_name, record.country_name_ban)"
              type="primary">Edit</a-button>
            <a-button @click="() => {
              isDeleteModalOpen = true;
              deletingCompanyId = record.id;
            }" danger type="primary">Delete</a-button>
          </div>
        </template>
      </template>
      <template #title>List of Company</template>
      <template #footer>Total Company</template>
    </a-table>
  </a-card>

  <a-modal v-model:open="isDeleteModalOpen" title="Modal" ok-text="Ok" cancel-text="Cancel" @ok="deleteCompany">
    Do you really want to delete company?
  </a-modal>
</template>