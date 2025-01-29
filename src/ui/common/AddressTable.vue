<template>
  <v-container>
    <v-row>
      <!-- Division Dropdown -->
      <v-col cols="3">
        <v-select
          v-model="addressCreateForm.division_id"
          :items="divisionList"
          item-title="name"
          item-value="id"
          label="Division"
          @change="onDivisionChange"
        />
      </v-col>

      <!-- District Dropdown -->
      <v-col cols="3">
        <v-select
          v-model="addressCreateForm.district_id"
          :items="filteredDistrictList"
          item-title="name"
          item-value="id"
          label="District"
          @change="onDistrictChange"
        />
      </v-col>

      <!-- Upazila Dropdown -->
      <v-col cols="3">
        <v-select
          v-model="addressCreateForm.upazila_id"
          :items="filteredUpzilaList"
          item-title="name"
          item-value="id"
          label="Upazila"
          @change="onUpazilaChange"
        />
      </v-col>

      <!-- Union Dropdown -->
      <v-col cols="3">
        <v-select
          v-model="addressCreateForm.union_id"
          :items="filteredUnionList"
          item-title="name"
          item-value="id"
          label="Union"
        />
      </v-col>
    </v-row>

    <v-row>
      <!-- Address Table -->
      <v-col>
        <v-data-table
          :headers="tableColumns"
          :items="filteredAddressList"
          :items-per-page="10"
          class="elevation-1"
          item-value="id"
        >
          <!-- Custom Rendering for Address Details -->
          <template v-slot:body.cell.address_details="{ item }">
            <div v-if="item.address_details">
              Line1: {{ item.address_details.line1 || "N/A" }}, 
              Division: {{ item.address_details.division || "N/A" }}, 
              District: {{ item.address_details.district || "N/A" }}, 
              Upazila: {{ item.address_details.upazila || "N/A" }}, 
              Union: {{ item.address_details.union || "N/A" }}, 
              Ward: {{ item.address_details.ward || "N/A" }}
            </div>
            <div v-else>
              N/A
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { getAddressListService, getDistrictListService, getDivisionListService, getUnionListService, getUpzillahListService } from "@/services/common.services";
import { ref, reactive, computed, onMounted } from "vue";

// Props for external configuration (optional)
defineProps({
  initialDivisionId: {
    type: Number,
    required: false,
    default: 0,
  },
});

// Reactive state for form and dropdown lists
const addressCreateForm = reactive({
  line1: "",
  division_id: 0, // Initial division, can be passed via props
  district_id: 0,
  upazila_id: 0,
  union_id: 0,
  ward_id: 0,
});

// Reactive lists for dropdowns
const divisionList = ref([]);
const districtList = ref([]);
const upazilaList = ref([]);
const unionList = ref([]);
const addressList = ref([]);

// Fetch dropdown data
const fetchDivisionList = async () => {
  const response = await getDivisionListService();
  if (response.status === 200) divisionList.value = response.data.data;
};

const fetchDistrictList = async () => {
  const response = await getDistrictListService();
  if (response.status === 200) districtList.value = response.data.data;
};

const fetchUpazilaList = async () => {
  const response = await getUpzillahListService();
  if (response.status === 200) upazilaList.value = response.data.data;
};

const fetchUnionList = async () => {
  const response = await getUnionListService();
  if (response.status === 200) unionList.value = response.data.data;
};

const fetchAddressList = async () => {
  const response = await getAddressListService();
  if (response.status === 200) addressList.value = response.data.data;
};

// Compute filtered lists based on selected values
const filteredDistrictList = computed(() =>
  districtList.value.filter((district) => district.division === addressCreateForm.division_id)
);

const filteredUpzilaList = computed(() =>
  upazilaList.value.filter((upazila) => upazila.district === addressCreateForm.district_id)
);

const filteredUnionList = computed(() =>
  unionList.value.filter((union) => union.upazila === addressCreateForm.upazila_id)
);

// Compute filtered address list
const filteredAddressList = computed(() => {
  return addressList.value.filter((address) => {
    return (
      (!addressCreateForm.division_id || address.address_details.division === addressCreateForm.division_id) &&
      (!addressCreateForm.district_id || address.address_details.district === addressCreateForm.district_id) &&
      (!addressCreateForm.upazila_id || address.address_details.upazila === addressCreateForm.upazila_id) &&
      (!addressCreateForm.union_id || address.address_details.union === addressCreateForm.union_id)
    );
  });
});

// Table columns
const tableColumns = [
  { text: "ID", value: "id" },
  { text: "Line 1", value: "line1" },
  { text: "Address Details", value: "address_details" },
];

// Event handlers for cascading dropdowns
const onDivisionChange = () => {
  addressCreateForm.district_id = 0;
  addressCreateForm.upazila_id = 0;
  addressCreateForm.union_id = 0;
};

const onDistrictChange = () => {
  addressCreateForm.upazila_id = 0;
  addressCreateForm.union_id = 0;
};

const onUpazilaChange = () => {
  addressCreateForm.union_id = 0;
};

// Fetch data on component mount
onMounted(() => {
  fetchDivisionList();
  fetchDistrictList();
  fetchUpazilaList();
  fetchUnionList();
  fetchAddressList();
});
</script>
