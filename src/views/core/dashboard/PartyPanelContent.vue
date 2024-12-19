<template>
  <!-- <div>
    <h3>This is Tab Content {{ tabNumber }}</h3>
    <p>Custom content for Tab {{ tabNumber }} goes here.</p>
  </div> -->
  <a-card>
    <a-table :dataSource="ElectionPartyList" :columns="electionPartyListColumns" :pagination="true">
      <template #actions="{ record }">
        <a-button type="primary">Edit</a-button>
        <a-button type="danger">Delete</a-button>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { getElectionPartyService } from '@/services/common.services';
import type { electionPartyInterfcae } from '@/interface/common.interface';
import { message } from 'ant-design-vue';

const ElectionPartyList = ref(<electionPartyInterfcae[]>[])

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