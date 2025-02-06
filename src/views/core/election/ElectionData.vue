<template>
  <a-row :gutter="[24, 24]" class="p-4 bg-gray-50 min-h-screen">
    <!-- Form Section -->
    <a-col :xs="24" :md="10" :lg="8">
      <a-card 
        title="Enter Election Data" 
        class="shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl"
        :headStyle="{ borderBottom: '3px solid #3B82F6', fontSize: '1.25rem', fontWeight: '600' }"
      >
        <a-form layout="vertical" :model="formState" @finish="handleSubmit" ref="formRef">
          <a-form-item label="Vote Count" name="vote_count" :rules="[{ required: true, message: 'Please input vote count!' }]">
            <a-input-number v-model:value="formState.vote_count" class="w-full rounded-lg" :min="0" :step="100" placeholder="Enter vote count" />
          </a-form-item>

          <a-form-item label="নির্বাচন নির্ধারণ করুন" name="election" :rules="[{ required: true, message: 'Please select election!' }]">
            <a-select v-model:value="formState.election" class="w-full rounded-lg" placeholder="Select Election" allow-clear>
              <a-select-option v-for="election in uniqueElections" :key="election.value" :value="election.value">
                {{ election.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="কর্মী নির্বাচন করুন" name="worker" :rules="[{ required: true, message: 'Please select worker!' }]">
            <a-select v-model:value="formState.worker" class="w-full rounded-lg" placeholder="Select Worker" allow-clear>
              <a-select-option v-for="worker in uniqueWorkers" :key="worker.value" :value="worker.value">
                {{ worker.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Election Center" name="election_center" :rules="[{ required: true, message: 'Please select election center!' }]">
            <a-select v-model:value="formState.election_center" class="w-full rounded-lg" placeholder="Select Center" allow-clear>
              <a-select-option v-for="center in uniqueElectionCenters" :key="center.value" :value="center.value">
                {{ center.label }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item name="is_deleted">
            <a-checkbox v-model:checked="formState.is_deleted" class="text-blue-600">Sent to Audit</a-checkbox>
          </a-form-item>

          <a-button type="primary" html-type="submit" class="w-full rounded-lg transition-transform duration-200 hover:scale-[1.02]" size="large">
            Submit Data
          </a-button>
        </a-form>
      </a-card>
    </a-col>

    <!-- Table Section -->
    <a-col :xs="24" :md="14" :lg="16">
      <a-card title="Election Records" class="shadow-lg rounded-xl" :headStyle="{ borderBottom: '3px solid #3B82F6', fontSize: '1.25rem', fontWeight: '600' }">
        <div class="mb-4 flex gap-2">
          <a-input v-model:value="searchText" placeholder="Search records..." allow-clear class="max-w-xs rounded-lg" size="large">
            <template #prefix>
              <SearchOutlined class="text-gray-400" />
            </template>
          </a-input>
        </div>

        <a-table :dataSource="ElectionDataSource" :columns="columns" :pagination="{ pageSize: 8 }" bordered size="middle" class="rounded-lg overflow-hidden">
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'is_deleted'">
              <a-tag :color="record.is_deleted ? 'blue' : 'green'" class="rounded-full px-3">
                {{ record.is_deleted ? 'Sent to Audit' : 'Active' }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'vote_count'">
              <span class="font-medium text-blue-600">
                {{ record.vote_count.toLocaleString() }}
              </span>
            </template>
            <template v-else-if="column.dataIndex === 'election'">
              {{ getElectionName(record.election) }}
            </template>
            <template v-else-if="column.dataIndex === 'worker'">
              {{ getWorkerName(record.worker) }}
            </template>
            <template v-else-if="column.dataIndex === 'election_center'">
              {{ getCenterName(record.election_center) }}
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import type { TableColumnType } from 'ant-design-vue';
import { createElectionDataService, getElectionDataListService } from '@/services/election/election.data.services';
import type { electionCenterInterface, electionDataInterface, electionInfoInterface } from '@/interface/election.interface';
import type { GeneralUserInterface } from '@/interface/user.interface';
import { getElectionInfoDataService } from '@/services/election/election.info.services';
import { UserListWithOutType } from '@/services/GeneralUser.services';
import { electionCenterListDataService } from '@/services/election/election-center.services';

onMounted(() => {
  fetchElectionInfoData();
  fetchWorkerData();
  fetchElectionCenterData();
  fetchElectionData()
});

interface ElectionData {
  key: number;
  vote_count: number;
  is_deleted: boolean;
  election: number;
  worker: number;
  election_center: number;
}

const formRef = ref();
const searchText = ref('');
let idCounter = 0;

const formState = reactive({
  vote_count: 0,
  is_deleted: false,
  election: 0,
  worker: 0,
  election_center: 0,
});

const ElectionDataSource = ref<electionDataInterface[]>([]);
const ElectionInfoData = ref<electionInfoInterface[]>([]);
const WorkerData = ref<GeneralUserInterface[]>([]);
const ElectionCenterData = ref<electionCenterInterface[]>([]);

const fetchElectionInfoData = async () => {
  const response = await getElectionInfoDataService();
  ElectionInfoData.value = response.data.data;
};

const fetchWorkerData = async () => {
  const response = await UserListWithOutType();
  WorkerData.value = response.data;
};

const fetchElectionCenterData = async () => {
  const response = await electionCenterListDataService();
  ElectionCenterData.value = response.data.data;
};

const fetchElectionData = async () => {
  const response = await getElectionDataListService();
  ElectionDataSource.value = response.data.data;
};

const uniqueElections = computed(() => {
  return ElectionInfoData.value.map(election => ({
    label: election.election_info_name_ban,
    value: election.id,
  }));
});

const uniqueWorkers = computed(() => {
  return WorkerData.value.map(worker => ({
    label: worker.username,
    value: worker.id,
  }));
});

const uniqueElectionCenters = computed(() => {
  return ElectionCenterData.value.map(center => ({
    label: center.center_name_ban,
    value: center.id,
  }));
});


// Name lookup functions corrected
const getElectionName = (id: number | null | undefined) => {
  return ElectionInfoData.value.find(election => election.id === id)?.election_info_name_ban || 'Unknown';
};

const getWorkerName = (id: number | null | undefined) => {
  return WorkerData.value.find(worker => worker.id === id)?.username || 'Unknown';
};

const getCenterName = (id: number | null | undefined) => {
  return ElectionCenterData.value.find(center => center.id === id)?.center_name_ban || 'Unknown'; // Fixed lookup
};

const columns: TableColumnType[] = [
  { title: 'Vote Count', dataIndex: 'vote_count' },
  { title: 'Status', dataIndex: 'is_deleted', filters: [
      { text: 'Active', value: false },
      { text: 'Pending Audit', value: true },
    ],
    onFilter: (value, record) => record.is_deleted === value,
  },
  { title: 'Election', dataIndex: 'election' },
  { title: 'Worker', dataIndex: 'worker' },
  { title: 'Center', dataIndex: 'election_center' },
];

const filteredData = computed(() => {
  return ElectionDataSource.value.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchText.value.toLowerCase())
    )
  );
});

const handleSubmit = async () => {
  const newRecord = { key: idCounter++, ...formState };
  ElectionDataSource.value.push(newRecord);
  formState.is_deleted = false;

  const response = await createElectionDataService(formState);
  ElectionDataSource.value = response.data.data;
  formRef.value.resetFields();
};
</script>
