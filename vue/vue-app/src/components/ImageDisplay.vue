<!-- ImageDisplay.vue -->
<template>
  <div class="card">
    <img :src="imageUrl" :alt="creditline" />
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    creditline: String,
  },
};
</script>

<style scoped>
div.card {
  max-width: 300px;
  display: inline-block;
  vertical-align: top;
  white-space: normal;
}

.image img {
  max-width: 100%;
  height: auto;
  max-height: 200px;
  display: flex;
  align-items: center;
}
</style>
