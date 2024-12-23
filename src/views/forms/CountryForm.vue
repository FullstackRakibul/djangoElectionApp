<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { countryAddService, deleteCountryService, getCountryListService, updateCountryService } from "../../services/common.services";
import { message } from 'ant-design-vue';

interface FormState {
  country_name: string;
  country_name_ban: string;
}

const countryList = ref([]);
const isEditing = ref(false);
const editingCountryId = ref(0);
const isDeleteModalOpen = ref(false);
const deletingCountryId = ref(0);
const countries = ref([]);
const countryForm = reactive<FormState>({
  country_name: '',
  country_name_ban: '',
});
const onFinish = async (values: any) => {
  if (isEditing.value) {

    console.log("Create Country data",values)
    updateCountry(values, editingCountryId.value);
  } else {
    await saveCountry(values)
  }
  await getCountryList();
};


const saveCountry = async (values: FormState) => {
  try {
    const res = await countryAddService(values);

    console.log("Added respobse :",res.data)
    if (res.status === 201) {
      message.success("Successfully created country");
      resetForm();
    }
  } catch (er) {
    message.error("Inernal server error");
  }
}


const updateCountry = async (values: FormState, id: any) => {
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


const deleteCountry = async () => {
  try {
    const res = await deleteCountryService(deletingCountryId.value);
    if (res.status === 200) {
      message.success("Successfully deleted the country");
      resetForm();
    }
    deletingCountryId.value = 0;
    isDeleteModalOpen.value = false;
    await getCountryList();
  } catch (er) {
    message.error("Inernal server error");
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const resetForm = () => {
  countryForm.country_name = "";
  countryForm.country_name_ban = ""
}



// Fetch country list function
const getCountryList = async () => {
  try {
   const response = await getCountryListService();
   console.log("RESPONSE FROM COUNTRY COMPONENT :p", response.data);
   countryList.value=response.data.data
  } catch (error) {
    console.error("Failed to fetch country list:", error);

    message.error("Internal server error. Please try again later.");
  }
};

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


const onEditButtonClick = async (id: any, country_name: any, country_name_ban: any) => {
  isEditing.value = true;
  editingCountryId.value = id;
  countryForm.country_name = country_name;
  countryForm.country_name_ban = country_name_ban
  console.log(id, country_name, country_name_ban)
}

onMounted(() => {
  getCountryList();
})




</script>

<template>
  <a-card>
    <a-form :model="countryForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed"  >
      <a-form-item label="Country Name" name="country_name"
        :rules="[{ required: true, message: 'Please input Country Name!' }]">
        <a-input v-model:value="countryForm.country_name" />
      </a-form-item>

      <a-form-item label="দেশের নাম" name="country_name_ban"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input v-model:value="countryForm.country_name_ban" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-card>

  
  <a-card>
    <a-table :pagination="false" :columns="columns" :data-source="countryList" bordered size="small">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'actions'">
          <div class="flex gap-4">
            <a-button @click="onEditButtonClick(record.id, record.country_name, record.country_name_ban)"
              type="primary" size="small">Edit</a-button>
            <a-button @click="() => {
              isDeleteModalOpen = true;
              deletingCountryId = record.id;
            }" danger type="primary" size="small">Delete</a-button>
          </div>
        </template>
      </template>
    </a-table>
  </a-card>

  <a-modal v-model:open="isDeleteModalOpen" title="Modal" ok-text="Ok" cancel-text="Cancel" @ok="deleteCountry">
    Do you really want to delete country?
  </a-modal>
</template>