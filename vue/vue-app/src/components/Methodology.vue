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
    <CategoriesBarChart
    :transformedData="transformData"
      :height="500"
      :width="width"
    />
  </div>
  <p>{{ transformedCatData }}</p>
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
import CategoriesBarChart from "./CategoriesBarChart.vue";

const MAX_SVG_WIDTH = 1920;

export default {
  name: "Methodology",
  components: {
    CatalogBarChart,
    CategoriesBarChart,
  },
  data() {
    return {
      width: Math.min(MAX_SVG_WIDTH, window.innerWidth), // Initialize width based on window size
    };
  },
  props: {
    catalogData: Object,
    sectionData: Array,
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
    // transformCatData() {
    //   const transformedCatData = [];
    //   // Iterate over the first level of the data
    //   for (let topLevelKey in this.sectionData) {
    //     const topLevelObject = this.sectionData[topLevelKey];
    //     // Initialize an object to hold the aggregated counts for this level
    //     const topLevelAggregatedCounts = {
    //       name: topLevelKey,
    //       value: 0
    //     };
    //     // Iterate over the second level of the data
    //     for (let secondLevelKey in topLevelObject) {
    //       const secondLevelObject = topLevelObject[secondLevelKey];
    //       // If there are ObjectIDs at this level, add their count to the aggregated count
    //       if (Array.isArray(secondLevelObject.ObjectIDs)) {
    //         topLevelAggregatedCounts.value += secondLevelObject.ObjectIDs.length;
    //       } else {
    //         // If there are deeper levels, iterate over them and add their counts
    //         for (let thirdLevelKey in secondLevelObject) {
    //           const thirdLevelObject = secondLevelObject[thirdLevelKey];
    //           topLevelAggregatedCounts.value += thirdLevelObject.ObjectIDs.length;
    //         }
    //       }
    //     }
    //     // Push the aggregated counts for this level to the transformed data array
    //     transformedCatData.push(topLevelAggregatedCounts);
    //   }
    //   return transformedCatData;
    // },
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
