<script lang="ts" setup>
import type { upzillahListInterface } from '@/interface/common.interface';
import { getUpzillahListService } from '@/services/common.services';
import { getDistrictByIdService } from '@/services/district.services';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const getUpzillahList = ref(<upzillahListInterface[]>[])
const loading = ref(false);

const UpzillahListFetch = async () => {
  try {
    loading.value = true;
    const response = await getUpzillahListService();
    if (response.status === 200) {
      getUpzillahList.value = response.data.data
      message.success("Upzillah List ...")

      // Fetch district name for each upzillah
      const upzillahWithDistricts = await Promise.all(
        response.data.data.map(async (upzillah: any) => {
          try {
            const districtResponse = await getDistrictByIdService(upzillah.district);
            return {
              ...upzillah,
              district_name: districtResponse.district_name,
            };

          } catch (error) {
            console.error("Failed to fetch district name:", error)
            return { ...upzillah, district_name: "Unknown District" }

          }
        }
        )
      )

      getUpzillahList.value = upzillahWithDistricts;
      message.success("Upzillah List Loaded!");
      loading.value = false
    } else {
      message.error("Upzillah Data Fetch Error !!!")
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  UpzillahListFetch()
})

const upzillahListColumns = [
  {
    title: "SL",
    dataIndex: "id"
  },
  {
    title: "Upzillah Name",
    dataIndex: "upazila_name"
  },
  {
    title: "উপজেলার নাম",
    dataIndex: "upazila_name_ban"
  },
  {
    title: "District Name",
    dataIndex: "district_name",
  },
  {
    title: "Action",
    dataIndex: "actions"

  },
]

</script>



<template>
  <a-card>
    <a-table :dataSource="getUpzillahList" :columns="upzillahListColumns" :loading="loading">

    </a-table>
  </a-card>
</template>