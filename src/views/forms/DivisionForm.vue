<script lang="ts" setup>
import "@/assets/main.css";
import { reactive, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  DivisionService,
  getCountryListService,
} from "../../services/common.services";

interface formState {
  division_name: string;
  division_name_ban: string;
  country_id: number;
}

interface Country {
  id: number;
  country_name: string;
}

const divisionForm = reactive<formState>({
  division_name: "",
  division_name_ban: "",
  country_id: 0,
});

const countryList = ref<Country[]>([]); 

const getCountryList = async () => {
  try {
    const res = await getCountryListService();
    if (res.status === 200) {
      countryList.value = res.data.data;
    }
  } catch (err) {
    message.error("Failed to fetch country list");
  }
};

// Fetch country list on component mount
onMounted(() => {
  getCountryList();
});

const onSubmit = async (values: any) => {
  console.log("Submitted Data:", values);
  try {
    const res = await DivisionService(values);
    if (res.status === 201) {
      message.success("Successfully created division");
      resetForm();
    }
  } catch (er) {
    message.error("Internal server error");
  }
};

const resetForm = () => {
  divisionForm.division_name = "";
  divisionForm.division_name_ban = "";
  divisionForm.country_id = 0;
};
</script>

<template>
  <!-- Responsive Card -->
  <a-card title="বিভাগ" class="shadow-md">
    <a-form
      :model="divisionForm"
      name="divisionForm"
      @finish="onSubmit"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 12 }"
      class="w-full"
      autocomplete="off"
    >
      <!-- Division Name -->
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item
            label="Division Name"
            name="division_name"
            :rules="[{ required: true, message: 'Please input Division Name!' }]"
          >
            <a-input v-model:value="divisionForm.division_name" />
          </a-form-item>
        </a-col>

        <!-- Division Name in Bangla -->
        <a-col :xs="24" :md="12">
          <a-form-item
            label="বিভাগের নাম"
            name="division_name_ban"
            :rules="[{ required: true, message: 'Please input Division Name in Bangla!' }]"
          >
            <a-input v-model:value="divisionForm.division_name_ban" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Country Select Dropdown -->
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item label="Select Country" name="country_id">
            <a-select
              v-model:value="divisionForm.country_id"
              show-search
              placeholder="Select a country"
              :options="countryList.map(country => ({ label: country.country_name, value: country.id }))"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- Submit Button -->
      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
            <a-button html-type="submit" type="primary" class="w-full md:w-auto">
              Submit
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>

  <!-- Division List Table -->
  <a-card title="List of Divisions" class="mt-6 shadow-md">
    <a-table :data-source="[]" :pagination="false">
      <!-- Add Table Columns Here -->
    </a-table>
  </a-card>
</template>

<style scoped>
/* Example custom styling if needed */
</style>
