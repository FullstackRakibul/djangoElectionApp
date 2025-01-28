<template>
  <a-row class="mb-4">
    <a-col :span="24">
      <a-card
        title="জয়ী প্রার্থী"
        :headStyle="{ fontSize: '18px', fontWeight: '600', borderBottom: '2px solid #1890ff' }"
        class="animated-card"
      >
        <a-list item-layout="horizontal" :data-source="winningCandidates">
          <template #renderItem="{ item, index }">
            <a-list-item 
              class="list-item"
              :style="{ 
                animationDelay: `${index * 0.1}s`,
                borderBottom: '1px solid #f0f0f0' 
              }"
            >
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar 
                    :style="{ 
                      backgroundColor: '#1890ff',
                      verticalAlign: 'middle',
                      transition: 'transform 0.3s'
                    }"
                    size="large"
                    @mouseenter="hoverAvatar(index)"
                    @mouseleave="unhoverAvatar(index)"
                  >
                    {{ item.initials }}
                  </a-avatar>
                </template>
                <template #title>
                  <span class="candidate-name">{{ item.name }}</span>
                </template>
                <template #description>
                  <div class="party-info">
                    <a-tag :color="getPartyColor(item.party)" class="party-tag">
                      {{ item.party }}
                    </a-tag>
                    <span class="constituency">{{ item.constituency }}</span>
                  </div>
                </template>
              </a-list-item-meta>
              
              <div class="vote-count">
                <a-tag color="success" class="vote-tag">
                  <template #icon>
                    <i class="fas fa-vote-yea" style="margin-right: 5px"></i>
                  </template>
                  {{ item.votes.toLocaleString() }}
                </a-tag>
              </div>
            </a-list-item>
          </template>
        </a-list>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { List, Avatar, Tag, Card } from 'ant-design-vue';

const winningCandidates = ref([
  {
    name: 'জনাব ব্যাক্তি ০১',
    party: 'উদাহরণ দল ০১',
    constituency: 'কেন্দ্রীয় ঢাকা',
    votes: 150234,
    initials: 'শাপলা'
  },
  {
    name: 'জনাব ব্যাক্তি ০২',
    party: 'উদাহরণ দল ০২',
    constituency: 'কেন্দ্রীয় ঢাকা',
    votes: 150212,
    initials: 'গোলাপ'
  },
  {
    name: 'জনাব ব্যাক্তি ০৩',
    party: 'উদাহরণ দল ০৩',
    constituency: 'কেন্দ্রীয় ঢাকা',
    votes: 150234,
    initials: 'ঘোড়া'
  },
  {
    name: 'জনাব ব্যাক্তি ০৪',
    party: 'উদাহরণ দল ০৪',
    constituency: 'কেন্দ্রীয় ঢাকা',
    votes: 150234,
    initials: 'গাড়ি'
  },
  {
    name: 'জন ডো',
    party: 'উদাহরণ দল',
    constituency: 'কেন্দ্রীয় ঢাকা',
    votes: 150234,
    initials: 'পাখা'
  },
  // Add more candidates...
]);

const getPartyColor = (party: string) => {
  const colors: { [key: string]: string } = {
    'জাতীয় দল': '#1890ff',
    'দলীয় জোট': '#52c41a',
    'অন্যান্য': '#722ed1'
  };
  return colors[party] || '#8c8c8c';
};

const hoverAvatar = (index: number) => {
  const avatars = document.querySelectorAll('.ant-avatar');
  if (avatars[index]) {
    
  }
};

const unhoverAvatar = (index: number) => {
  const avatars = document.querySelectorAll('.ant-avatar');
  
};
</script>

<style scoped>
.animated-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.animated-card:hover {
  transform: translateY(-2px);
}

.list-item {
  padding: 16px 24px;
  animation: slideIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.candidate-name {
  font-size: 16px;
  font-weight: 500;
  color: #1d1d1d;
}

.party-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.party-tag {
  border-radius: 4px;
  font-weight: 500;
}

.constituency {
  color: #595959;
  font-size: 14px;
}

.vote-tag {
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 15px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.vote-count {
  margin-right: 16px;
}

@media (max-width: 768px) {
  .list-item {
    padding: 12px 16px;
  }
  
  .candidate-name {
    font-size: 14px;
  }
  
  .constituency {
    font-size: 12px;
  }
}
</style>