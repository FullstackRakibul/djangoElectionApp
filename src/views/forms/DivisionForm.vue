<script lang="ts" setup>
import "@/assets/main.css";
import { reactive, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  
  getCountryListService,
  getDivisionListService,
  postDivisionService,
} from "../../services/common.services";

interface division {
  division_name: string;
  division_name_ban: string;
  country_id: number;
}


interface Country {
  id: number;
  country_name: string;
  country_name_ban:string;
}

const divisionForm = reactive<division>({
  division_name: "",
  division_name_ban: "",
  country_id: 0,
});

const countryList = ref(<Country[]>[]);
const divisionList = ref<division[]>([]);



// Fetch country list on component mount
onMounted(() => {
  getCountryList();
  getDivisionList();
});



const getDivisionList = async () => {
  try {
    const response = await getDivisionListService();
    if (response.status === 200) {
      divisionList.value = response.data.data;
      console.log("Division List Data:", response.data.data);
    } else {
      message.warning("Division List Response Error!");
    }
  } catch (error) {
    console.error("Error fetching division list:", error);
    message.error("Error fetching division list data!");
  }
};


const getCountryList = async () => {
  try {
    const response = await getCountryListService();
    if (response.status === 200) {
      console.log("Country List Data:", response.data.data);
      countryList.value = response.data.data;
    }else {
      message.warning("Division List Response Error!");
    }
  } catch (err) {
    message.error("Failed to fetch country list");
  }
};



const onSubmit = async (values: any) => {
  console.log("Submitted Data to create division :", values);
  try {
    const res = await postDivisionService(values);

    console.log("response from request : ", res);
    if (res.status === 200) {
      message.success("Successfully created division !");
      resetForm();
      await getDivisionList();
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



// fetch table data ...

const divisionListColumns = [
  {
    title : 'SL',
    dataIndex :'id'
  },
  {
    title : 'Division Name',
    dataIndex :'division_name'
  },
  {
    title : 'বিভাগের নাম',
    dataIndex :'division_name_ban'
  },
  {
    title : 'Country',
    dataIndex :'country'
  },
  {
    title: 'Action',
    key: "actions"
  },
]

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
    <a-table 
    :data-source=divisionList 
    :columns="divisionListColumns"
    :pagination="false">
    rowKey="id"
      <!-- Add Table Columns Here -->
    </a-table>
  </a-card>
</template>

<style scoped>
/* Example custom styling if needed */
</style>
