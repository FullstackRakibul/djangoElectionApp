<template>
  <v-card class="mx-auto w-100" style="overflow-x: hidden;">
    <!-- Main Title Section -->
    <v-toolbar>
      <v-toolbar-title>আসন সমূহের লিষ্ট</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>

    <!-- Divider -->
    <v-divider />

    <!-- List Section -->
    <v-list density="compact">
      <v-list-item v-for="(item, index) in items" :key="index">
        <!-- Left Avatar -->
        <template v-slot:prepend>
          <v-avatar>
            <img :src="item.prependAvatar" alt="Left Avatar" />
          </v-avatar>
        </template>

        <!-- Center Content -->
        <v-list-item-content class="d-flex flex-row flex-wrap justify-space-between align-center">
          <v-list-item-title class="mr-4">{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle class="mr-4">
              <div v-html="item.subtitle"></div>
            </v-list-item-subtitle>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>

        <!-- Right Avatar -->
        <template v-slot:append>
          <v-avatar>
            <img
              :src="item.appendAvatar || item.prependAvatar"
              alt="Right Avatar"
            />
          </v-avatar>
        </template>
        <v-divider />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
const items = [
  {
    name: "মোঃ রাহিম",
    subtitle: `<span class="text-primary">Ali Connors</span> &mdash; Party Name One`, 
    title: "Bangladesh Demo Party 01",
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    appendAvatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  },
  {
    name: "মোঃ করিম",
    subtitle: "Party Name Two",
    title: "Bangladesh Demo Party 02",
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    appendAvatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  },
  {
    name: "মোঃ হাশেম",
    subtitle: "Party Name Three",
    title: "Bangladesh Demo Party 03",
    prependAvatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
    appendAvatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
  },
];
</script>
