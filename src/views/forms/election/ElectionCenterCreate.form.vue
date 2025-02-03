<template>
  <a-card title="Create Election Center" class="max-w-2xl mx-auto">
    <a-form layout="vertical" @finish="handleSubmit">
      <!-- Center Name Fields -->
      <a-form-item label="Center Name (English)" name="center_name"
        :rules="[{ required: true, message: 'Please input center name!' }]">
        <a-input v-model:value="formState.center_name" />
      </a-form-item>

      <a-form-item label="কেন্দ্রের নাম (বাংলা)" name="center_name_ban"
        :rules="[{ required: true, message: 'Please input Bengali center name!' }]">
        <a-input v-model:value="formState.center_name_ban" />
      </a-form-item>

      <!-- Address Section -->
      <div class="space-y-4">
        <a-form-item label="Division" name="division" :rules="[{ required: true, message: 'Please select division!' }]">
          <a-select v-model:value="formState.address.division" show-search :options="divisionOptions"
            placeholder="Select Division" @change="handleDivisionChange" />
        </a-form-item>

        <a-form-item label="District" name="district" :rules="[{ required: true, message: 'Please select district!' }]">
          <a-select v-model:value="formState.address.district" show-search :options="districtOptions"
            placeholder="Select District" :disabled="!formState.address.division" @change="handleDistrictChange" />
        </a-form-item>

        <a-form-item label="Upazila" name="upazila" :rules="[{ required: true, message: 'Please select upazila!' }]">
          <a-select v-model:value="formState.address.upazila" show-search :options="upazilaOptions"
            placeholder="Select Upazila" :disabled="!formState.address.district" @change="handleUpazilaChange" />
        </a-form-item>

        <a-form-item label="Union" name="union" :rules="[{ required: true, message: 'Please select union!' }]">
          <a-select v-model:value="formState.address.union" show-search :options="unionOptions"
            placeholder="Select Union" :disabled="!formState.address.upazila" />
        </a-form-item>

        <a-form-item label="Ward" name="ward" :rules="[{ required: true, message: 'Please select ward!' }]">
          <a-select v-model:value="formState.address.ward" show-search :options="wardOptions" placeholder="Select Ward"
            :disabled="!formState.address.union" />
        </a-form-item>

        <a-form-item label="Address Line 1" name="line1"
          :rules="[{ required: true, message: 'Please input address line!' }]">
          <a-input v-model:value="formState.address.line1" />
        </a-form-item>
      </div>

      <a-button type="primary" html-type="submit" block>Submit</a-button>
    </a-form>
  </a-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';
import { getDistrictListService, getDivisionListService, getUnionListService, getUpzillahListService, getWordListService } from '@/services/common.services';

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

// Submit handler
const handleSubmit = () => {
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

  console.log('Submission Payload:', payload);
  // Here you would call your API
  message.success('Form submitted successfully!');
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
    console.log("UpZillah response service : " ,upazilasRes );
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
</style>