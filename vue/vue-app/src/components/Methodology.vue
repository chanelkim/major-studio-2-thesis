<template>
  <div>
    <h1>Page X</h1>
    <h3>Methodology</h3>
    <p>How I got there</p>
  </div>
  <div>
    <CatalogBarChart
      :transformedData="transformData"
      :height="500"
      :width="width"
    />
  </div>
  <div>
    <p>Data Length: {{ Object.keys(catalogData).length }}</p>
    <p v-for="(items, category) in catalogData" :key="category">
      <ul v-for="item in items" :key="item.category">
        {{
          item.category
        }}
        -
        {{
          item.count
        }}
      </ul>
    </p>
  </div>
</template>

<script>
import CatalogBarChart from "./CatalogBarChart.vue";

const MAX_SVG_WIDTH = 1920;

export default {
  name: "Methodology",
  components: {
    CatalogBarChart,
  },
  data() {
    return {
      width: Math.min(MAX_SVG_WIDTH, window.innerWidth), // Initialize width based on window size
    };
  },
  props: {
    catalogData: Object,
  },
  computed: {
    transformData() {
      const transformedData = [];
      for (let key in this.catalogData) {
        const total = this.catalogData[key].reduce(
          (sum, item) => sum + item.count,
          0
        );
        transformedData.push({ name: key, value: total });
      }
      return transformedData;
    },
  },
  methods: {
    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>ul {
  color: black;
}
@media (max-width: 768px) {
  .recommendation-group {
    flex-direction: column;
    align-items: left;
  }
}</style>
