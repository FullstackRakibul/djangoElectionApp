<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <!-- Create Form -->
    <ElectionCenterCreateForm />

    <!-- Search and Filters -->
    <a-card class="shadow-sm">
      <a-row :gutter="16" class="items-center">
        <a-col :span="8">
          <a-input
            v-model:value="searchQuery"
            placeholder="Search by center name"
            allow-clear
          >
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-select
            v-model:value="selectedDivision"
            placeholder="Filter by division"
            :options="uniqueDivisions"
            allow-clear
          />
        </a-col>
        <a-col :span="8">
          <a-select
            v-model:value="selectedDistrict"
            placeholder="Filter by district"
            :options="uniqueDistricts"
            allow-clear
          />
        </a-col>
      </a-row>
    </a-card>

    <!-- Election Center List -->
    <a-card
      title="Election Centers"
      class="shadow-lg rounded-xl"
      :headStyle="{ borderBottom: '2px solid #1890ff' }"
    >
      <a-table
        :dataSource="filteredCenters"
        :columns="centerColumns"
        :loading="loadingCenters"
        :pagination="{ pageSize: 10 }"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'address_details'">
            <div class="space-y-1">
              <div class="font-medium text-gray-900">
                {{ record.address_details?.line1 }}
              </div>
              <div class="text-gray-600 text-sm">
                {{ formatAddress(record.address_details) }}
              </div>
            </div>
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-space>
              <a-button type="link" size="small" class="text-blue-600 hover:text-blue-800">
                Edit
              </a-button>
              <a-button type="link" danger size="small" class="hover:text-red-800">
                Delete
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { electionCenterListDataService } from '@/services/election/election-center.services';
import type { electionCenterInterface, electionCenterListInterface } from '@/interface/election.interface';


import ElectionCenterCreateForm from '@/views/forms/election/ElectionCenterCreate.form.vue';
import type { districtListInterface, divisionListInterface, unionListInterface, upzillahListInterface, wordListInterface } from '@/interface/common.interface';
// Data
const electionCenters = ref<electionCenterListInterface[]>([]);
const loadingCenters = ref(false);
const searchQuery = ref('');
const selectedDivision = ref<number | null>(null);
const selectedDistrict = ref<number | null>(null);
const selectedOpzillah = ref<number | null>(null);
const selectedUnion = ref<number | null>(null);
const selectedWord = ref<number | null>(null);

const divisions = ref<divisionListInterface[]>([]);
const districts = ref<districtListInterface[]>([]);
const upzillahs = ref<upzillahListInterface[]>([]);
const unions = ref<unionListInterface[]>([]);
const wards = ref<wordListInterface[]>([]);



onMounted(() => {
  refreshData();
});

// Fetch data with proper loading state
const refreshData = async () => {
  try {
    loadingCenters.value = true;
    const response = await electionCenterListDataService();
    electionCenters.value = response.data.data;
  } catch (error) {
    message.error('Error loading centers!');
    console.error(error);
  } finally {
    loadingCenters.value = false;
  }
};

// Filtered data with null safety
const filteredCenters = computed(() => {
  return electionCenters.value.filter(center => {
    const search = searchQuery.value.toLowerCase();
    const name = center.center_name?.toLowerCase() || '';
    const matchesSearch = name.includes(search);
    
    const matchesDivision = selectedDivision.value ? 
      center.address_details?.division === selectedDivision.value : true;
      
    const matchesDistrict = selectedDistrict.value ? 
      center.address_details?.district === selectedDistrict.value : true;
    return matchesSearch && matchesDivision && matchesDistrict;
  });
});

// Unique filter options with null checks
const uniqueDivisions = computed(() => {
  const divisions = new Set(
    electionCenters.value
      .map(c => c.address_details?.division)
      .filter(id => id !== null && id !== undefined)
  );
  return Array.from(divisions).map(id => ({
    value: id,
    label: getDivisionName(id)
  }));
});

const uniqueDistricts = computed(() => {
  const districts = new Set(
    electionCenters.value
      .map(c => c.address_details?.district)
      .filter(id => id !== null && id !== undefined)
  );
  return Array.from(districts).map(id => ({
    value: id,
    label: getDistrictName(id)
  }));
});

// Safe address formatting with null checks
const formatAddress = (address: any) => {
  const parts = [
    address?.ward ? `Ward: ${getWardName(address.ward)}` : 'Ward: N/A',
    address?.union ? `Union: ${getUnionName(address.union)}` : 'Union: N/A',
    address?.upazila ? `Upazila: ${getUpazilaName(address.upazila)}` : 'Upazila: N/A',
    address?.district ? `District: ${getDistrictName(address.district)}` : 'District: N/A',
    address?.division ? `Division: ${getDivisionName(address.division)}` : 'Division: N/A'
  ].filter(part => !part.endsWith('N/A')); // Remove N/A entries

  return parts.length > 0 ? parts.join(' • ') : 'Address information not available';
};

// Null-safe name resolution functions
const getDivisionName = (id: number | null | undefined) => {
  if (!id) return 'N/A';
  return divisions.value.find(d => d.id === id)?.division_name_ban || 'N/A';
};

const getDistrictName = (id: number | null | undefined) => {
  if (!id) return 'N/A';
  return districts.value.find(d => d.id === id)?.district_name_ban || 'N/A';
};

const getUpazilaName = (id: number | null | undefined) => {
  if (!id) return 'N/A';
  return upzillahs.value.find(u => u.id === id)?.upazila_name_ban || 'N/A';
};

const getUnionName = (id: number | null | undefined) => {
  if (!id) return 'N/A';
  return unions.value.find(u => u.id === id)?.union_name_ban || 'N/A';
};

const getWardName = (id: number | null | undefined) => {
  if (!id) return 'N/A';
  return wards.value.find(w => w.id === id)?.ward_name_ban || 'N/A';
};

// Table columns with null-safe data access
const centerColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    sorter: (a: electionCenterInterface, b: electionCenterInterface) => (a.id || 0) - (b.id || 0)
  },
  {
    title: 'Center Name',
    dataIndex: 'center_name',
    sorter: (a: electionCenterInterface, b: electionCenterInterface) => 
      (a.center_name || '').localeCompare(b.center_name || '')
  },
  {
    title: 'Bengali Name',
    dataIndex: 'center_name_ban',
    customRender: ({ text }: { text?: string }) => text || 'N/A'
  },
  {
    title: 'Address Details',
    key: 'address_details',
    customRender: ({ text }: { text?: any }) => text ? formatAddress(text) : 'N/A'
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 150
  }
];
</script>
<style scoped>
.ant-input-affix-wrapper {
  @apply rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 transition-all duration-300;
}

.ant-select-selector {
  @apply rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 transition-all duration-300;
}

.ant-table {
  @apply rounded-lg overflow-hidden;
}

.ant-table-thead > tr > th {
  @apply bg-gray-100 font-semibold text-gray-700;
}

.ant-table-tbody > tr:hover > td {
  @apply bg-blue-50;
}
</style>