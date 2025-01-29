<template>
  <a-row :gutter="[24, 24]" class="p-4 bg-gray-50 min-h-screen">
    <!-- Form Section -->
    <a-col :xs="24" :md="10" :lg="8">
      <a-card title="Enter Election Data" class="shadow-sm rounded-lg"
        :headStyle="{ borderBottom: '2px solid #1890ff' }">
        <a-form layout="vertical" :model="formState" @finish="handleSubmit" ref="formRef">
          <a-form-item label="Vote Count" name="vote_count"
            :rules="[{ required: true, message: 'Please input vote count!' }]">
            <a-input-number v-model:value="formState.vote_count" class="w-full" :min="0" :step="100" />
          </a-form-item>

          <a-form-item label="Election ID" name="election">
            <a-input v-model:value="formState.election" type="number" placeholder="Enter election ID" />
          </a-form-item>

          <a-form-item label="Worker ID" name="worker">
            <a-input v-model:value="formState.worker" type="number" placeholder="Enter worker ID" />
          </a-form-item>

          <a-form-item label="Election Center" name="election_center">
            <a-input v-model:value="formState.election_center" type="number" placeholder="Enter center ID" />
          </a-form-item>

          <a-form-item name="is_deleted">
            <a-checkbox v-model:checked="formState.is_deleted">
              Sent to Audit
            </a-checkbox>
          </a-form-item>

          <a-button type="primary" html-type="submit" class="w-full" size="large">
            Submit Data
          </a-button>
        </a-form>
      </a-card>
    </a-col>

    <!-- Table Section -->
    <a-col :xs="24" :md="14" :lg="16">
      <a-card title="Election Records" class="shadow-sm rounded-lg" :headStyle="{ borderBottom: '2px solid #1890ff' }">
        <div class="mb-4 flex gap-2">
          <a-input v-model:value="searchText" placeholder="Search records..." allow-clear class="max-w-xs">
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </div>

        <a-table :dataSource="filteredData" :columns="columns" :pagination="{ pageSize: 8 }" bordered size="middle">
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'is_deleted'">
              <a-tag :color="text ? 'red' : 'green'">
                {{ text ? 'Deleted' : 'Active' }}
              </a-tag>
            </template>
            <template v-else-if="column.dataIndex === 'vote_count'">
              <span class="font-medium text-blue-600">
                {{ text.toLocaleString() }}
              </span>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import type { TableColumnType } from 'ant-design-vue';

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

const dataSource = ref<ElectionData[]>([]);

const columns: TableColumnType[] = [
  {
    title: 'Vote Count',
    dataIndex: 'vote_count',
    sorter: (a, b) => a.vote_count - b.vote_count,
  },
  {
    title: 'Status',
    dataIndex: 'is_deleted',
    filters: [
      { text: 'Active', value: false },
      { text: 'Deleted', value: true },
    ],
    onFilter: (value, record) => record.is_deleted === value,
  },
  { title: 'Election ID', dataIndex: 'election' },
  { title: 'Worker ID', dataIndex: 'worker' },
  { title: 'Center ID', dataIndex: 'election_center' },
];

const filteredData = computed(() => {
  return dataSource.value.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchText.value.toLowerCase())
    )
  );
});

const handleSubmit = () => {
  dataSource.value.push({
    key: idCounter++,
    ...formState,
  });

  formRef.value.resetFields();
  formState.is_deleted = false;
};
</script>

<style scoped>
.ant-input-number {
  width: 100%;
}

.ant-card {
  border-radius: 0.5rem;
  overflow: hidden;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f8fafc !important;
  font-weight: 600;
}

:deep(.ant-table) {
  border-radius: 0.5rem;
  overflow: hidden;
}
</style>