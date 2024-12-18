<script setup lang="ts">
import { electionHttpJson } from '@/utils/axios/base.Http';
import { onMounted } from 'vue';

const fetchWordList = async () => {
  try {
    const res = await electionHttpJson().get("/common/ward/"); // Await the API response
    console.log("Ward API Response:", res.data); // Log the resolved data
  } catch (error) {
    console.error("Fetch Error:", error); // Handle and log errors
  }
};

onMounted(() => {
  fetchWordList(); // Call the API fetching function on component mount
});
</script>

<template>
  <!-- Add template here if needed -->
</template>
