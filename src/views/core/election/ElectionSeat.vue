<script lang="ts" setup>
import type { electionCenterInterface, electionSeatInterface } from '@/interface/election.interface';
import { createElectionSeatService, getElectionSeatService } from '@/services/election/election.seat.services';
import { onMounted, ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { electionCenterListDataService } from '@/services/election/election-center.services';

const ElectionSeatData = ref<electionSeatInterface[]>([]);
const ElectionCenterData = ref<electionCenterInterface[]>([]);

const formState = reactive({
  election_seat_name: '',
  election_seat_name_ban: '',
  is_deleted: false,
  election_center: [] as number[], // Store center IDs here
});

onMounted(() => {
  fetchElectionSeat();
  fetchElectionCenterData();
});

const fetchElectionSeat = async () => {
  try {
    const response = await getElectionSeatService();
    ElectionSeatData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching election seats:', error);
  }
};

const fetchElectionCenterData = async () => {
  try {
    const response = await electionCenterListDataService();
    ElectionCenterData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching election centers:', error);
  }
};

const ElectionSeatColumn = [
  {
    title: 'Seat Name',
    dataIndex: 'election_seat_name',
  },
  {
    title: 'Seat Name (Bangla)',
    dataIndex: 'election_seat_name_ban',
  },
  {
    title: 'Centers',
    dataIndex: 'election_center',
    customRender: ({ text }: { text: number[] }) =>
      text.map(id => ElectionCenterData.value.find(center => center.id === id)?.center_name_ban || id).join(', '),
  },
  {
    title: 'Status',
    dataIndex: 'is_deleted',
    customRender: ({ text }: { text: boolean }) => (text ? 'Deleted' : 'Active'),
  },
];

const addCenterField = () => {
  formState.election_center.push(0); // Default value for new entry
};

const removeCenterField = (index: number) => {
  formState.election_center.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    const payload = {
      ...formState,
      election_center: formState.election_center.filter(center => center !== 0),
    };

    await createElectionSeatService(payload);
    message.success('Seat created successfully!');

    // Reset form
    formState.election_seat_name = '';
    formState.election_seat_name_ban = '';
    formState.is_deleted = false;
    formState.election_center = [];

    // Refresh table data
    await fetchElectionSeat();
  } catch (error) {
    message.error('Error creating seat');
    console.error('Error:', error);
  }
};
</script>

<template>
  <a-card title="Seat Management" :headStyle="{ borderBottom: '2px solid #1890ff' }">
    <template #extra>
      <a-button type="primary" @click="handleSubmit">Create Seat</a-button>
    </template>

    <a-form layout="vertical" style="margin-bottom: 2rem;">
      <a-form-item label="Seat Name (English)">
        <a-input v-model:value="formState.election_seat_name" />
      </a-form-item>

      <a-form-item label="Seat Name (Bangla)">
        <a-input v-model:value="formState.election_seat_name_ban" />
      </a-form-item>

      <a-form-item label="Status">
        <a-checkbox v-model:checked="formState.is_deleted">Mark as Deleted</a-checkbox>
      </a-form-item>

      <a-form-item label="Election Centers (Name)">
        <div v-for="(centerId, index) in formState.election_center" :key="index" style="margin-bottom: 8px;">
          <a-space>
            <!-- Select Component -->
            <a-select
              v-model:value="formState.election_center[index]"
              placeholder="Select Center"
              style="width: 200px;"
            >
              <a-select-option
                v-for="center in ElectionCenterData"
                :key="center.id"
                :value="center.id"
              >
                {{ center.center_name_ban }}
              </a-select-option>
            </a-select>
            <a-button danger @click="removeCenterField(index)">Remove</a-button>
          </a-space>
        </div>
        <a-button @click="addCenterField">
          <template #icon><plus-outlined /></template>
          Add Center
        </a-button>
      </a-form-item>
    </a-form>

    <a-card title="Existing Seats" style="margin-top: 20px;" :headStyle="{ borderBottom: '2px solid #1890ff' }">
      <a-table :dataSource="ElectionSeatData" :columns="ElectionSeatColumn" rowKey="id">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'is_deleted'">
            <a-tag :color="text ? 'red' : 'green'">{{ text ? 'Deleted' : 'Active' }}</a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </a-card>
</template>
