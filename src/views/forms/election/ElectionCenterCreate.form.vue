<template>
  <a-card 
    title="Create Election Center" 
    class="shadow-lg rounded-xs transition-all duration-300 hover:shadow-xl mb-8"
  >
    <a-form layout="vertical" :model="formState" @finish="handleSubmit" class="p-6">
      <a-row :gutter="24">
        <!-- Left Column -->
        <a-col :span="12" class="space-y-4">
          <a-form-item 
            label="Center Name (English)"
            name="center_name"
            :rules="[{ required: true, message: 'Please input center name!' }]"
          >
            <a-input 
              v-model:value="formState.center_name" 
              class="w-full rounded-md border-gray-300 focus:border-blue-500"
            />
          </a-form-item>

          <a-form-item 
            label="কেন্দ্রের নাম (বাংলা)"
            name="center_name_ban"
            :rules="[{ required: true, message: 'Please input Bengali center name!' }]"
          >
            <a-input 
              v-model:value="formState.center_name_ban" 
              class="w-full rounded-md border-gray-300 focus:border-blue-500"
            />
          </a-form-item>

          <a-form-item 
            label="Division"
            name="division"
            :rules="[{ required: true, message: 'Please select division!' }]"
          >
            <a-select
              v-model:value="formState.address.division"
              show-search
              :options="divisionOptions"
              placeholder="Select Division"
              @change="handleDivisionChange"
              class="w-full rounded-md"
            />
          </a-form-item>

          <a-form-item 
            label="District"
            name="district"
            :rules="[{ required: true, message: 'Please select district!' }]"
          >
            <a-select
              v-model:value="formState.address.district"
              show-search
              :options="districtOptions"
              placeholder="Select District"
              :disabled="!formState.address.division"
              @change="handleDistrictChange"
              class="w-full rounded-md"
            />
          </a-form-item>
        </a-col>

        <!-- Right Column -->
        <a-col :span="12" class="space-y-4">
          <a-form-item 
            label="Upazila"
            name="upazila"
            :rules="[{ required: true, message: 'Please select upazila!' }]"
          >
            <a-select
              v-model:value="formState.address.upazila"
              show-search
              :options="upazilaOptions"
              placeholder="Select Upazila"
              :disabled="!formState.address.district"
              @change="handleUpazilaChange"
              class="w-full rounded-md"
            />
          </a-form-item>

          <a-form-item 
            label="Union"
            name="union"
            :rules="[{ required: true, message: 'Please select union!' }]"
          >
            <a-select
              v-model:value="formState.address.union"
              show-search
              :options="unionOptions"
              placeholder="Select Union"
              :disabled="!formState.address.upazila"
              class="w-full rounded-md"
            />
          </a-form-item>

          <a-form-item 
            label="Ward"
            name="ward"
            :rules="[{ required: true, message: 'Please select ward!' }]"
          >
            <a-select
              v-model:value="formState.address.ward"
              show-search
              :options="wardOptions"
              placeholder="Select Ward"
              :disabled="!formState.address.union"
              class="w-full rounded-md"
            />
          </a-form-item>

          <a-form-item 
            label="Address Line 1"
            name="line1"
            :rules="[{ required: true, message: 'Please input address line!' }]"
          >
            <a-input 
              v-model:value="formState.address.line1" 
              class="w-full rounded-md border-gray-300 focus:border-blue-500"
            />
          </a-form-item>
        </a-col>
      </a-row>

 <a-form-item :wrapper-col="{ offset: 16, span: 8 }">


      <a-button 
        type="primary" 
        html-type="submit" 
        block
        class="mt-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
         @click="handleSubmit" 
      >
        Create Center
      </a-button> 
    </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';
import { getDistrictListService, getDivisionListService, getUnionListService, getUpzillahListService, getWordListService } from '@/services/common.services';
import { electionCenterCreateService } from '@/services/election/election-center.services';

const submitting = ref(false);
// Define interfaces
interface Address {
  line1: string;
  division: number | null;
  district: number | null;
  upazila: number | null;
  union: number | null;
  ward: number | null;
}

interface FormState {
  center_name: string;
  center_name_ban: string;
  address: Address;
}

// Reactive state
const formState = reactive<FormState>({
  center_name: '',
  center_name_ban: '',
  address: {
    line1: '',
    division: null,
    district: null,
    upazila: null,
    union: null,
    ward: null
  }
});

// Data lists
const divisions = ref<SelectProps['options']>([]);
const districts = ref<SelectProps['options']>([]);
const upazilas = ref<SelectProps['options']>([]);
const unions = ref<SelectProps['options']>([]);
const wards = ref<SelectProps['options']>([]);

// Computed options
const divisionOptions = computed(() => divisions.value);
const districtOptions = computed(() =>
  districts.value?.filter(d => d?.division === formState.address.division)
);
const upazilaOptions = computed(() =>
  upazilas.value?.filter(u => u?.district === formState.address.district)
);
const unionOptions = computed(() =>
  unions.value?.filter(u => u?.upazila === formState.address.upazila)
);
const wardOptions = computed(() =>
  wards.value?.filter(w => w?.union === formState.address.union)
);

// Handlers
const handleDivisionChange = () => {
  formState.address.district = null;
  formState.address.upazila = null;
  formState.address.union = null;
  formState.address.ward = null;
};

const handleDistrictChange = () => {
  formState.address.upazila = null;
  formState.address.union = null;
  formState.address.ward = null;
};

const handleUpazilaChange = () => {
  formState.address.union = null;
  formState.address.ward = null;
};


// Modified submit handler
const handleSubmit = async () => {

  console.log("Form submit click ")

  try {
    submitting.value = true;
    
    const payload = {
      center_name: formState.center_name,
      center_name_ban: formState.center_name_ban,
      address_details: {
        line1: formState.address.line1,
        division: formState.address.division,
        district: formState.address.district,
        upazila: formState.address.upazila,
        union: formState.address.union,
        ward: formState.address.ward
      }
    };

    console.log("Submitting payload:", payload);
    
    const response = await electionCenterCreateService(payload);
    console.log('Creation response:', response.data);

    // Reset form after successful submission
    formState.center_name = '';
    formState.center_name_ban = '';
    formState.address = {
      line1: '',
      division: null,
      district: null,
      upazila: null,
      union: null,
      ward: null
    };

    message.success('Center created successfully!');
  } catch (error) {
    console.error('Submission error:', error);
    message.error('Failed to create center!');
  } finally {
    submitting.value = false;
  }
};

// Fetch initial data
onMounted(async () => {
  try {
    // Replace these with your actual service calls
    const divisionsRes = await getDivisionListService();
    divisions.value = divisionsRes.data.data.map((d: any) => ({ value: d.id, label: d.division_name_ban }));

    const districtsRes = await getDistrictListService();
    districts.value = districtsRes.data.data.map((d: any) => ({ value: d.id, label: d.district_name_ban, division: d.division }));

    const upazilasRes = await getUpzillahListService();
    upazilas.value = upazilasRes.data.data.map((u: any) => ({  value: u.id, label: u.upazila_name_ban, district: u.district }));

    const unionsRes = await getUnionListService();
    unions.value = unionsRes.data.data.map((u: any) => ({ value: u.id, label: u.union_name_ban, upazila: u.upazila }));

    const wardsRes = await getWordListService();
    wards.value = wardsRes.data.data.map((w: any) => ({ value: w.id, label: w.ward_name_ban,union: w.union }));

  } catch (error) {
    message.error('Error loading initial data!');
    console.error(error);
  }
});
</script>

<style scoped>
.ant-select {
  width: 100%;
}
.ant-select-selector {
  @apply rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 transition-all duration-300;
}

.ant-input {
  @apply rounded-md border-gray-300 hover:border-blue-500 focus:border-blue-500 transition-all duration-300;
}

.ant-form-item-label label {
  @apply font-medium text-gray-700;
}

.ant-card-head-title {
  @apply text-2xl font-bold text-gray-800;
}
</style>