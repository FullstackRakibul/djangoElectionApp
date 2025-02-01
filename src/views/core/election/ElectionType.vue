
<template>
  <a-row :gutter="[24, 24]" class="p-4">
    <!-- Create Form -->
    <a-col :xs="24" :md="12" :lg="8">
      <a-card 
        title="Create Election Type"
        class="shadow-md rounded-lg"
        :headStyle="{ borderBottom: '2px solid #1890ff' }"
      >
        <a-form
          layout="vertical"
          :model="formState"
          @finish="handleSubmit"
          ref="formRef"
        >
          <!-- English Name -->
          <a-form-item
            label="Type Name (English)"
            name="election_type_name"
            :rules="[{ required: true, message: 'Please input English type name!' }]"
          >
            <a-input
              v-model:value="formState.election_type_name"
              placeholder="Enter english type name"
              class="w-full"
            />
          </a-form-item>

          <!-- Bengali Name -->
          <a-form-item
            label="Type Name (বাংলা)"
            name="election_type_name_ban"
          >
            <a-input
              v-model:value="formState.election_type_name_ban"
              placeholder="বাংলা টাইপ নাম লিখুন"
              class="w-full"
            />
          </a-form-item>

          <a-button
            type="primary"
            html-type="submit"
            class="w-full"
            :loading="submitting"
          >
            Create Type
          </a-button>
        </a-form>
      </a-card>
    </a-col>

    <!-- Data Table -->
    <a-col :xs="24" :md="12" :lg="16">
      <a-card
        title="Election Types"
        class="shadow-md rounded-lg"
        :headStyle="{ borderBottom: '2px solid #1890ff' }"
      >
        <a-table
          :dataSource="ElectionTypeData"
          :columns="ElectionTypeColumn"
          :loading="loading"
          bordered
        >
          <template #bodyCell="{ column }">
            <template v-if="column.dataIndex === 'created_by'">
              <a-tag color="blue">System</a-tag>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { electionType } from '@/interface/election.interface';
import { 
  getElectionTypeService,
  createElectionTypeService 
} from '@/services/election/election.type.services';

const formRef = ref();
const submitting = ref(false);
const loading = ref(false);
const ElectionTypeData = ref<electionType[]>([]);

const formState = reactive({
  election_type_name: '',
  election_type_name_ban: '',
});

const ElectionTypeColumn = [
  {
    title: "English Name",
    dataIndex: "election_type_name",
    sorter: (a: electionType, b: electionType) => a.election_type_name.localeCompare(b.election_type_name)
  },
  {
    title: "বাংলা নাম",
    dataIndex: "election_type_name_ban"
  },
  {
    title: "Created By",
    dataIndex: "created_by"
  }
];

const handleSubmit = async () => {
  submitting.value = true;
  try {
    const response = await createElectionTypeService(formState);
    if (response.status === 201) {
      message.success('Election type created successfully!');
      formRef.value.resetFields();
      await fetchElectionType();
    }
  } catch (error) {
    message.error('Error creating election type!');
    console.error('Creation error:', error);
  } finally {
    submitting.value = false;
  }
};

const fetchElectionType = async () => {
  loading.value = true;
  try {
    const response = await getElectionTypeService();
    ElectionTypeData.value = response.data.data;
  } catch (error) {
    message.error('Error fetching election types!');
    console.error('Fetch error:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchElectionType();
});
</script>

<style scoped>
.ant-card {
  border-radius: 0.5rem;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #f8fafc !important;
  font-weight: 600;
}

.ant-input {
  border-radius: 0.375rem;
}
</style>

<!-- 
<script lang="ts" setup>
import type { electionSeatInterface } from '@/interface/election.interface';
import { getElectionTypeService } from '@/services/election/election.type.services';
import { onMounted, ref } from 'vue';

const ElectionTypeData = ref<electionSeatInterface[]>([])


// on mount 
onMounted(()=>{
  fetchElectionType()
})

const fetchElectionType = async ()=>{
  const response = await getElectionTypeService()
  ElectionTypeData.value = response.data.data
}

const ElectionTypeColumn =[
  {
    title:"Type Name",
    dataIndex:"election_type_name"
  },
  {
    title:"Type Name",
    dataIndex:"election_type_name_ban"
  },
  {
    title:"Type Name",
    dataIndex:"updated_by"
  }
]

</script>

<template>
  <a-card
    title="Election Type"
  >
  <a-table
  :dataSource="ElectionTypeData"
  :columns="ElectionTypeColumn"
  ></a-table>

  </a-card>
</template> -->