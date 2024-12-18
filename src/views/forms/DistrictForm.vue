<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
// /import { districtAddService, deletedistrictService, getdistrictListService, updatedistrictService } from "../../services/common.services";
import { message } from 'ant-design-vue';
import { electionHttpJson } from '@/utils/axios/base.Http';
import {getDistrictListService} from "../../services/district.services"

interface FormState {
  district_name: string;
  district_name_ban: string;
}

const districtList = ref([]);
const isEditing = ref(false);
const editingdistrictId = ref(0);
const isDeleteModalOpen = ref(false);
const deletingdistrictId = ref(0);

const districtForm = reactive<FormState>({
  district_name: '',
  district_name_ban: '',
});


const onFinish = async (values: any) => {
  console.log("Submit Value District:", values);

  // Include division ID directly in the form values
  const payload = { ...values, division: 2 };

  try {
    const res = await electionHttpJson().post("/common/district/", payload);
    console.log("Post Response:", res.data);

    // Add the new entry to the district list dynamically
    //districtList.value.push(res.data);

    message.success("Successfully added the district");
    resetForm(); // Clear the form
  } catch (error) {
    console.error("Error while adding district:", error);
    message.error("Failed to add district");
  }

  await getdistrictList(); // Refresh the district list
};



const savedistrict = async (values: FormState) => {
  // try {
  //   const res = await districtAddService(values);
  //   if (res.status === 201) {
  //     message.success("Successfully created district");
  //     resetForm();
  //   }
  // } catch (er) {
  //   message.error("Inernal server error");
  // }
}


const updatedistrict = async (values: FormState, id: any) => {
  // try {
  //   const res = await updatedistrictService(values, id);
  //   if (res.status === 200) {
  //     message.success("Successfully updated the district");
  //     resetForm();
  //   }
  //   isEditing.value = false;
  // } catch (er) {
  //   message.error("Inernal server error");
  // }
}


const deletedistrict = async () => {
  try {
    // const res = await deletedistrictService(deletingdistrictId.value);
    // if (res.status === 200) {
    //   message.success("Successfully deleted the district");
    //   resetForm();
    // }
    // deletingdistrictId.value = 0;
    // isDeleteModalOpen.value = false;
    // await getdistrictList();
  } catch (er) {
    message.error("Inernal server error");
  }
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const resetForm = () => {
  districtForm.district_name = "";
  districtForm.district_name_ban = ""
}

const getdistrictList = async () => {
  try {
    const res = await getDistrictListService()
    if (res.status === 200) {

      console.log("District List : ", res.data.data) 
      districtList.value = res.data.data;
      message.success('District Data Fetch Success !!')
    }

  } catch (err) {
    message.error("Internal server error")
  }
}


const columns = [
  {
    title: 'SL',
    dataIndex: 'id',
  },
  {
    title: 'district Name',
    dataIndex: 'district_name',
  },
  {
    title: 'district Name Ban',
    dataIndex: 'district_name_ban',
  },
  {
    title: 'Action',
    key: "actions"
  },
];


const onEditButtonClick = async (id: any, district_name: any, district_name_ban: any) => {
  isEditing.value = true;
  editingdistrictId.value = id;
  districtForm.district_name = district_name;
  districtForm.district_name_ban = district_name_ban
  console.log(id, district_name, district_name_ban)
}

onMounted(() => {
  getdistrictList();
})




</script>

<template>
  <a-card>
    <a-form :model="districtForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 10 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="district Name" name="district_name"
        :rules="[{ required: true, message: 'Please input district Name!' }]">
        <a-input v-model:value="districtForm.district_name" />
      </a-form-item>

      <a-form-item label="দেশের নাম" name="district_name_ban"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input v-model:value="districtForm.district_name_ban" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
      </a-form-item>
    </a-form>
  </a-card>
  <a-card>
    <a-table :pagination="false" :columns="columns" :data-source="districtList" bordered>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'actions'">
          <div class="flex gap-4">
            <a-button @click="onEditButtonClick(record.id, record.district_name, record.district_name_ban)"
              type="primary">Edit</a-button>
            <a-button @click="() => {
              isDeleteModalOpen = true;
              deletingdistrictId = record.id;
            }" danger type="primary">Delete</a-button>
          </div>
        </template>
      </template>
      <template #title>List of district</template>
      <template #footer>Total district</template>
    </a-table>
  </a-card>

  <a-modal v-model:open="isDeleteModalOpen" title="Modal" ok-text="Ok" cancel-text="Cancel" @ok="deletedistrict">
    Do you really want to delete district?
  </a-modal>
</template>