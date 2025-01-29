<template>
  <div class="tab-container">
    <!-- SVG Design -->
    <!-- <div class="svg-header">
      <img src="@/assets/bangladesh.svg" alt="SVG Design" class="header-svg" />
    </div> -->

    <!-- Tab Buttons -->
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
        
      >
        <Transition name="slide-fade">
          <p>{{ tab }}</p>
        </Transition>
      </button>
    </div>

    <!-- Tab Content -->
     <Transition name="slide-fade" mode="out-in">
       <div class="tab-content" :key="activeTab">
         <component :is="components[activeTab]" />
       </div>
     </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; 

import DashboardTabContent from '../DashboardTabContent.vue';
import CandidateTabContent from '../CandidateTabContent.vue';
import ConstituentTabContent from '../ConstituentTabContent.vue';
import PartyPanelContent from '../PartyPanelContent.vue';
import LocalLogsContent from '../LocalLogsContent.vue';


const activeTab = ref(0);
 const tabs =[
  'ড্যাশবোর্ড',
  'ফলাফল দেখুন',
  'আসন সমূহ দেখুন',
  'দল সমূহ দেখুন',
  'জাতীয় সংসদ নির্বাচন আচরণ বিধিমালা',
 ]

 const components = [
  DashboardTabContent,
  CandidateTabContent,
  ConstituentTabContent,
  PartyPanelContent,
  LocalLogsContent,
];


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
  border-radius: 5%;
  font-size:medium;
}


.tab-buttons .active {
  background-color: #007355;
  color: white;
  border-radius: 5%;
}

.tab-content {
  margin-top: 20px;
  padding: 1px;
  
  
}




/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
