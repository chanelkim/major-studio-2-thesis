<template>
  <div>
    <input type="text" ref="name" />
    <button @click="handleClick">Search Index</button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log(this.$refs.name);
      this.$refs.name.classList.add("active");
      this.$refs.name.focus();
    },
  },
};
</script>

<style></style>
