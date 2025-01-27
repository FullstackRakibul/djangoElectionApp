<template>
  <v-container>
    <v-row class="p">
      <!-- Form Section -->
      <v-col cols="12" md="4">
        <v-card elevation="3" class="pa-4">
          <v-card-title class="text-h6">Enter Election Data</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-form ref="formRef" v-model="valid">
            <!-- Vote Count Input -->
            <v-text-field
              v-model="electionData.vote_count"
              label="Vote Count"
              type="number"
              :rules="[rules.required, rules.number]"
              outlined
            ></v-text-field>

            <!-- Is Deleted Switch -->
            <v-switch
              v-model="electionData.is_deleted"
              label="Is Deleted?"
              inset
            ></v-switch>

            <!-- Election ID -->
            <v-text-field
              v-model="electionData.election"
              label="Election ID"
              type="number"
              :rules="[rules.required, rules.number]"
              outlined
            ></v-text-field>

            <!-- Worker ID -->
            <v-text-field
              v-model="electionData.worker"
              label="Worker ID"
              type="number"
              :rules="[rules.required, rules.number]"
              outlined
            ></v-text-field>

            <!-- Election Center -->
            <v-text-field
              v-model="electionData.election_center"
              label="Election Center ID"
              type="number"
              :rules="[rules.required, rules.number]"
              outlined
            ></v-text-field>

            <!-- Submit Button -->
            <v-btn
              class="mt-4"
              :disabled="!valid"
              block
              color="primary"
              @click="submitData"
            >
              Submit
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Table Section -->
      <v-col cols="12" md="8">
        <v-card elevation="3">
          <v-card-title class="text-h6">Election Data List</v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :items="electionDataList"
            :headers="tableHeaders"
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <transition-group name="fade" tag="tbody">
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.vote_count }}</td>
                  <td>{{ item.is_deleted ? "Yes" : "No" }}</td>
                  <td>{{ item.election }}</td>
                  <td>{{ item.worker }}</td>
                  <td>{{ item.election_center }}</td>
                </tr>
              </transition-group>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

interface ElectionData {
  vote_count: number;
  is_deleted: boolean;
  election: number;
  worker: number;
  election_center: number;
}

// Reactive form data for new election entry
const electionData = reactive<ElectionData>({
  vote_count: 0,
  is_deleted: false,
  election: 0,
  worker: 0,
  election_center: 0,
});

// Reactive list of election data
const electionDataList = ref<ElectionData[]>([]);

// Form validity state
const valid = ref(false);

// Validation rules
const rules = {
  required: (value: any) => !!value || "This field is required.",
  number: (value: any) =>
    !isNaN(value) && Number(value) >= 0 || "Must be a valid number.",
};

// Form reference for validation
const formRef = ref();

// Function to submit data
const submitData = () => {
  if (formRef.value && formRef.value.validate()) {
    // Add a deep copy of the election data to the list
    electionDataList.value.push({ ...electionData });

    // Reset the form
    Object.assign(electionData, {
      vote_count: 0,
      is_deleted: false,
      election: 0,
      worker: 0,
      election_center: 0,
    });
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


<!-- <script lang="ts" setup>
import type { electionDataInterface } from '@/interface/election.interface';
import { getElectionDataListService } from '@/services/election/election.data.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';


const ElectionData = ref(<electionDataInterface[]>[]);
const loading = ref(false);

const fetchElectionData = async () => {
  try {
    loading.value = true;
    const response = await getElectionDataListService();
    if (response.status === 200) {
      ElectionData.value = response.data.data
      message.success("Election Data Success ...");
      loading.value = false
    }
  } catch (error) {
    loading.value = false
    console.log("Election data fetch error ", error)
  }
}

onMounted(() => {
  fetchElectionData()
})


const electionListColumns = [
  {
    title: "Election",
    dataIndex: "election"
  },
  {
    title: "Vote Count",
    dataIndex: "vote_count"
  },
  {
    title: "election",
    dataIndex: "election"
  },
  {
    title: "worker",
    dataIndex: "worker"
  },
  {
    title: "election_center",
    dataIndex: "election_center"
  },
]

</script>

<template>
  <a-card title="Election Data">
    <a-table :dataSource="ElectionData" :columns="electionListColumns" :loading="loading">
    </a-table>
  </a-card>
</template> -->