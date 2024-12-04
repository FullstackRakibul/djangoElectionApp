<template>
  <div>
    <h3>This is Tab Content {{ tabNumber }}</h3>
    <p>Custom content for Tab {{ tabNumber }} goes here.</p>
  </div>
</template>

<script>
export default {
  props: {
    tabNumber: {
      type: Number,
      default: 3,
    },
  },
};
</script>
