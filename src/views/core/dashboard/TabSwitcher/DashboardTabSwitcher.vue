<template>
  <div class="tab-container">
    <!-- SVG Design -->
    <div class="svg-header">
      <img src="@/assets/bangladesh.svg" alt="SVG Design" class="header-svg" />
    </div>

    <!-- Tab Buttons -->
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
        
      >
        <p>{{ tab }}</p>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <component :is="components[activeTab]" />
    </div>
  </div>
</template>

<script>
import DashboardTabContent from './DashboardTabContent.vue';
import CandidateTabContent from './CandidateTabContent.vue';
import ConstituentTabContent from './ConstituentTabContent.vue';
import PartyPanelContent from './PartyPanelContent.vue';
import LocalLogsContent from './LocalLogsContent.vue';

export default {
  data() {
    return {
      activeTab: 1,
      tabs: ['ড্যাশবোর্ড', 'ক্যান্ডিডেট দেখুন', 'আসন সমূহ দেখুন', 'দল সমূহ দেখুন', 'স্থানীয় আলাপ সমূহ দেখুন'],
      components: [DashboardTabContent, CandidateTabContent, ConstituentTabContent, PartyPanelContent, LocalLogsContent],
    };
  },
};
</script>

<style scoped>



.tab-container {
  text-align: center;
  font-family: Hind Siliguri, sans-serif;
}

.svg-header .header-svg {
  width: 3%;
  height: auto;
}

.tab-buttons button {
  margin: 5px;
  padding: 0px 25px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tab-buttons .active {
  background-color: #007355;
  color: white;
}

.tab-content {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
