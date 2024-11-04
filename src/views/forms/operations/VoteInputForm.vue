<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { Form, Input, Button, InputNumber, message } from 'ant-design-vue';

// Define types for form and candidate
interface Vote {
  candidateId: string;
  count: number | null;
}

interface FormState {
  centerId: string;
  votes: Vote[];
}

// Initialize form with explicit type
const form: Ref<FormState> = ref({
  centerId: '',
  votes: [],
});

// Example candidates with symbols
const candidates = [
  { id: '1', name: 'Candidate A', symbol: '🌟' },
  { id: '2', name: 'Candidate B', symbol: '🌹' },
  { id: '3', name: 'Candidate C', symbol: '🌴' },
];

// Initialize vote counts for each candidate
form.value.votes = candidates.map(candidate => ({ candidateId: candidate.id, count: null }));

// Handle form submission
const handleSubmit = () => {
  if (form.value.centerId && form.value.votes.every(v => v.count !== null)) {
    message.success('Data submitted successfully');
    console.log('Submitted Data:', form.value);
  } else {
    message.error('Please fill out all fields');
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Vote Input Form</h2>
    <a-form layout="vertical" @submit.prevent="handleSubmit">
      <!-- Voting Center Selection -->
      <a-form-item label="Voting Center ID" required>
        <a-input
          v-model:value="form.value.centerId"
          placeholder="Enter center ID"
          class="w-full"
        />
      </a-form-item>

      <!-- Candidate Vote Counts -->
      <div v-for="candidate in candidates" :key="candidate.id" class="mb-4">
        <a-form-item :label="`${candidate.name} (${candidate.symbol})`" required>
          <a-input-number
            v-model:value="form.value.votes.find(v => v.candidateId === candidate.id).count"
            placeholder="Enter vote count"
            min="0"
            class="w-full"
          />
        </a-form-item>
      </div>

      <!-- Submit Button -->
      <a-form-item>
        <a-button type="primary" html-type="submit" block @click="handleSubmit">
          Submit Votes
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
/* Custom styles if needed */
</style>
