<template>
  <div>
    <h1>Component</h1>
    <h3>Catalog Bar Chart</h3>
  </div>
  <div>
    <!-- {{ catalogData }} -->
    <p>Data Length: {{ Object.keys(catalogData).length }}</p>

    <ul v-for="(items, category) in catalogData" :key="category">
      <ul v-for="item in items" :key="item.category">
        {{
          item.category
        }}
        -
        {{
          item.count
        }}
      </ul>
    </ul>
  </div>
  <!-- <svg :height="height" :width="width">
      <g class="bars" />
    </svg> -->
</template>

<script>
// import * as d3 from "d3";

export default {
  name: "CatalogBarChart",
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
</style>
