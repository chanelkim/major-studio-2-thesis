<template>
  <div>
    <h1>Page X</h1>
    <h3>The Catalog</h3>
    <p>Metadata for objects pictured in the IoAD</p>
  </div>
  <div>
    {{ catalogData }}
    <p>Data Length: {{ Object.keys(catalogData).length }}</p>

    <ul v-for="(items, category) in catalogData" :key="category">
      <li v-for="item in items" :key="item.category">
        {{ item.category }} - {{ item.count }}
      </li>
    </ul>
  </div>
  <!-- <svg :height="height" :width="width">
    <g class="bars" />
  </svg> -->
</template>

<script>
// import * as d3 from "d3";

export default {
  name: "Catalog",
  props: {
    catalogData: Object,
  },
  mounted() {
    console.log("catalogData received:", this.catalogData);
  },
};
</script>

<style>
ul {
  color: black;
}
body {
  background-color: lightyellow;
}
</style>
