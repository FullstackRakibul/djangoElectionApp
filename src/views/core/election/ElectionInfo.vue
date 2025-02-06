<script lang="ts" setup>
import type { electionInfoInterface, electionPartyInterfcae } from '@/interface/election.interface';
import { createElectionInfoDataService, getElectionInfoDataService } from '@/services/election/election.info.services';
import { onMounted, ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { getElectionPartyService } from '@/services/common.services';
import type { GeneralUserInterface } from '@/interface/user.interface';
import { UserListWithOutType } from '@/services/GeneralUser.services';

const ElectionInfoData = ref<electionInfoInterface[]>([]);
const electionPartyData = ref<electionPartyInterfcae[]>([]);

const formState = reactive({
  election_info_name: '',
  election_info_name_ban: '',
  total_voter: null as number | null,
  total_votes: null as number | null,
  is_deleted: false,
  candidates: [] as number[],
  parties: [] as number[],
  workers: [] as number[],
});

onMounted(() => {
  fetchElectionInfo();
  fetchElectionPartyData();
  fetchUserListData();
});

const fetchElectionInfo = async () => {
  try {
    const response = await getElectionInfoDataService();
    ElectionInfoData.value = response.data.data;
  } catch (error) {
    message.error('ডেটা লোড করতে সমস্যা হয়েছে');
  }
};

const electionInfoDataColumn = [
  {
    title: "নির্বাচনের নাম (ইংরেজি)",
    dataIndex: "election_info_name",
    className: 'font-semibold'
  },
  {
    title: "নির্বাচনের নাম",
    dataIndex: "election_info_name_ban",
  },
  {
    title: "মোট ভোটার",
    dataIndex: "total_voter",
    customRender: ({ text }: { text: number }) => text?.toLocaleString() || '০',
  },
  {
    title: "মোট ভোট",
    dataIndex: "total_votes",
    customRender: ({ text }: { text: number }) => text?.toLocaleString() || '০',
  },
  {
    title: "স্ট্যাটাস",
    dataIndex: "is_deleted",
  }
];

const addField = (field: 'candidates' | 'parties' | 'workers') => {
  formState[field].push(0);
};

const removeField = (field: 'candidates' | 'parties' | 'workers', index: number) => {
  formState[field].splice(index, 1);
};

const handleSubmit = async () => {
  try {
    await createElectionInfoDataService({
      ...formState,
      total_voter: formState.total_voter || 0,
      total_votes: formState.total_votes || 0,
    });

    message.success('নির্বাচন সফলভাবে তৈরি হয়েছে');
    resetForm();
    await fetchElectionInfo();
  } catch (error) {
    message.error('নির্বাচন তৈরি করতে সমস্যা হয়েছে');
    console.error(error);
  }
};

const resetForm = () => {
  Object.assign(formState, {
    election_info_name: '',
    election_info_name_ban: '',
    total_voter: null,
    total_votes: null,
    is_deleted: false,
    candidates: [],
    parties: [],
    workers: [],
  });
};

const fetchElectionPartyData = async () => {
  try {
    const response = await getElectionPartyService();
    electionPartyData.value = response.data.data;
  } catch (error) {
    message.error('ডেটা লোড করতে সমস্যা হয়েছে');
  }
};

const userListData = ref<GeneralUserInterface[]>([]);
const fetchUserListData = async () => {
  try {
    const response = await UserListWithOutType();
    userListData.value = response.data;
  } catch (error) {
    message.error('ডেটা লোড করতে সমস্যা হয়েছে');
  }
};
</script>

<template>
  <a-row :gutter="24" class="p-4">
    <!-- Form Column -->
    <a-col :span="12" class="pr-4">
      <a-card 
        title="নতুন নির্বাচন তৈরি করুন"
        class="shadow-lg hover:shadow-xl transition-shadow duration-300"
        :headStyle="{ borderBottom: '2px solid #1890ff' }"
      >
        <a-form layout="vertical" class="space-y-4">
          <!-- English Name -->
          <a-form-item label="নির্বাচনের নাম (ইংরেজি)" required>
            <a-input 
              v-model:value="formState.election_info_name"
              placeholder="Enter election name in English"
              class="hover:border-blue-400 focus:border-blue-500"
            />
          </a-form-item>

          <!-- Bangla Name -->
          <a-form-item label="নির্বাচনের নাম (বাংলা)" required>
            <a-input 
              v-model:value="formState.election_info_name_ban"
              placeholder="বাংলায় নির্বাচনের নাম লিখুন"
              class="hover:border-blue-400 focus:border-blue-500"
            />
          </a-form-item>

          <!-- Voter and Votes -->
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="মোট ভোটার" required>
                <a-input-number 
                  v-model:value="formState.total_voter"
                  :min="0"
                  class="w-full hover:border-blue-400"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="মোট ভোট" required>
                <a-input-number 
                  v-model:value="formState.total_votes"
                  :min="0"
                  class="w-full hover:border-blue-400"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <!-- Dynamic Input Sections -->
          <div class="space-y-6">
            <!-- Candidates -->
            <div v-for="(candidate, index) in formState.candidates" :key="`candidate-${index}`" class="flex gap-2">
              <a-select
                  v-model:value="formState.candidates[index]"
                  placeholder="প্রার্থী নির্বাচন করুন"
                  class="flex-1"
                  :options="(userListData || []).map(user => ({ label: user.username, value: user.id }))"
                />

              <a-button danger @click="removeField('candidates', index)">
                <delete-outlined />
              </a-button>
            </div>
            <a-button @click="addField('candidates')" class="w-full">
              <plus-outlined /> প্রার্থী যোগ করুন
            </a-button>

            <!-- Parties -->
            <div v-for="(party, index) in formState.parties" :key="`party-${index}`" class="flex gap-2">
              <a-select
                v-model:value="formState.parties[index]"
                placeholder="দল নির্বাচন করুন"
                class="flex-1"
                :options="(electionPartyData ||[]).map(party => ({ label: party.party_name, value: party.id }))"
              />
              <a-button danger @click="removeField('parties', index)">
                <delete-outlined />
              </a-button>
            </div>
            <a-button @click="addField('parties')" class="w-full">
              <plus-outlined /> দল যোগ করুন
            </a-button>

            <!-- Workers -->
            <div v-for="(worker, index) in formState.workers" :key="`worker-${index}`" class="flex gap-2">
              <a-select
                  v-model:value="formState.workers[index]"
                  placeholder="কর্মী নির্বাচন করুন"
                  class="flex-1"
                  :options="(userListData || []).map(user => ({ label: user.phone, value: user.id }))"
                />
              <a-button danger @click="removeField('workers', index)">
                <delete-outlined />
              </a-button>
            </div>
            <a-button @click="addField('workers')" class="w-full">
              <plus-outlined /> কর্মী যোগ করুন
            </a-button>
          </div>

          <!-- Status and Submit -->
          <a-form-item label="স্ট্যাটাস">
            <a-switch 
              v-model:checked="formState.is_deleted"
              checked-children="বাতিল"
              un-checked-children="সক্রিয়"
            />
          </a-form-item>

          <a-button 
            type="primary" 
            @click="handleSubmit"
            class="w-full bg-blue-600 hover:bg-blue-700 h-10 text-lg"
          >
            নির্বাচন তৈরি করুন
          </a-button>
        </a-form>
      </a-card>
    </a-col>

    <!-- Table Column -->
    <a-col :span="12" class="pl-4">
      <a-card 
        title="নির্বাচন তালিকা"
        class="shadow-lg hover:shadow-xl transition-shadow duration-300"
        :headStyle="{ borderBottom: '2px solid #1890ff' }"
      >
        <a-table 
          :dataSource="ElectionInfoData"
          :columns="electionInfoDataColumn"
          :pagination="{ pageSize: 6 }"
          rowKey="id"
          bordered
        >
          <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'is_deleted'">
              <a-tag :color="text ? 'red' : 'green'">
                {{ text ? 'বাতিল' : 'সক্রিয়' }}
              </a-tag>
            </template>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.ant-input-number, .ant-input {
  transition: all 0.3s ease;
}

.ant-input-number:hover, .ant-input:hover {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.ant-card {
  border-radius: 12px;
}

.ant-btn-primary {
  transition: all 0.3s ease;
}

.ant-btn-primary:hover {
  transform: translateY(-1px);
}
</style>