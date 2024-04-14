<template>
  <div>
    <h1>Page X</h1>
    <h3>The Catalog</h3>
    <p>Metadata for objects pictured in the IoAD</p>
  </div>
  <svg :height="height" :width="width">
    <g class="bars" />
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "Catalog",
  data() {},
  props: {
    data: Object,
    height: Number,
    width: Number,
  },
  computed: {},
  async updated() {
    const data = await d3.json("@/data/catalog_categories.json");
  },
};
</script>

<style></style>
