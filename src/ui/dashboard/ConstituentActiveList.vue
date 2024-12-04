<template>
  <v-card
  >
    <v-toolbar >
      <v-toolbar-title>আসন সমূহের লিষ্ট </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify" variant="text"></v-btn>
    </v-toolbar>

    <v-list
      :items="items"
      lines="three"
      item-props
    >
      <template v-slot:subtitle="{ subtitle }">
        <div v-html="subtitle"></div>
      </template>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">

const items = [
{
  subtitle:"Party Name One"
},
{
  subtitle:"Party Name Two"
},
{
  subtitle:"Party Name Three"
},
]

</script>