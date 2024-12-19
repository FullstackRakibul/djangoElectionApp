<script lang="ts" setup>
import type { electionPartyInterfcae } from '@/interface/common.interface';
import { getElectionPartyService, postElectionPartyService } from '@/services/common.services';
import { message } from 'ant-design-vue';
import { onMounted, reactive, ref } from 'vue';


const isEditing = ref(false);
const ElectionPartyList = ref(<electionPartyInterfcae[]>[])
const ElectionPartyFrom = reactive<electionPartyInterfcae>({
  party_name: '',
  party_name_ban: '',
  party_symbol: ''

})
const fetchElectionPartyList = async () => {
  try {
    const response = await getElectionPartyService();
    if (response.status === 200) {
      ElectionPartyList.value = response.data.data
      message.success("Election Party List")
    } else {
      message.error("Party List error !!!")

    }
  } catch (error) {
    console.log("Fetch Request Error : ", error)
  }

}

onMounted(() => {
  fetchElectionPartyList()
})

const onFinish = async (values: electionPartyInterfcae) => {
  const response = await postElectionPartyService(values);
  if (response.status === 201) {
    console.log(response.data)
    message.success("Party Created Complete")
    fetchElectionPartyList()
  } else {
    message.error("Party Create Failed !!!")
  }
};


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};



const electionPartyListColumns = [
  {
    title: "Party Name",
    dataIndex: "party_name"
  },
  {
    title: "পার্টি বা দলের নামে",
    dataIndex: "party_name_ban"
  },
  {
    title: "Symbol / প্রতীক",
    dataIndex: "party_symbol"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    slots: { customRender: "actions" },
  },

]
</script>

<template>
  <a-card title="Party / দল তৈরী করুন">
    <a-form :model="ElectionPartyFrom" name="electionPartyCreateForm" :label-col="{ span: 8 }"
      :wrapper-col="{ span: 10 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item name="party_name" label="Party/দলের নামে"
        :rules="[{ required: true, message: 'Please input party Name...' }]">
        <a-input v-model:value="ElectionPartyFrom.party_name"></a-input>
      </a-form-item>
      <a-form-item name="party_name_ban" label="দলের নামে"
        :rules="[{ required: true, message: 'দলের নাম প্রবেশ করান...' }]">
        <a-input v-model:value="ElectionPartyFrom.party_name_ban"></a-input>
      </a-form-item>
      <a-form-item name="party_symbol" label="প্রতীক নির্ধারন করুন"
        :rules="[{ required: true, message: 'প্রতীক যোগ করুন...' }]">
        <a-input v-model:value="ElectionPartyFrom.party_symbol"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit"> {{ isEditing ? 'Update' : 'Save' }}</a-button>
      </a-form-item>
    </a-form>

  </a-card>
  <a-card>
    <a-table :dataSource="ElectionPartyList" :columns="electionPartyListColumns" :pagination="true">
      <template #actions="{ record }">
        <a-button type="primary">Edit</a-button>
        <a-button type="danger">Delete</a-button>
      </template>
    </a-table>
  </a-card>
</template>