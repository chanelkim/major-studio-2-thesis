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
    :transformedCatData="transformCatData"
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

  transformCatData() {
    const transformedCatData = [];

    // Define a recursive function to traverse the hierarchy and aggregate counts
    const aggregateCounts = (data) => {
      let count = 0; // Declare count here

      for (let key in data) {
        const object = data[key];

        // If the current object has ObjectIDs, add their count
        if (Array.isArray(object.ObjectIDs)) {
          count += object.ObjectIDs.length;
        }

        // If the current object has nested levels, recursively aggregate counts
        if (typeof object === 'object' && Object.keys(object).length > 0) {
          count += aggregateCounts(object);
        }
      }

      return count; // Return the total count for this level
    };

    // Define a recursive function to traverse the hierarchy and build transformed data
    const buildTransformedData = (data) => {
      for (let key in data) {
        const object = data[key];
        let count = 0;

        // If the current object has ObjectIDs, add their count
        if (Array.isArray(object.ObjectIDs)) {
          count += object.ObjectIDs.length;
        }

        // If the current object has nested levels, recursively aggregate counts
        if (typeof object === 'object' && Object.keys(object).length > 0) {
          count += aggregateCounts(object);
        }

        // Add the aggregated count to the transformed data
        transformedCatData.push({ name: key, value: count });
      }
    };

    // Start aggregating counts from the top-level data
    buildTransformedData(this.sectionData);

    return transformedCatData;
  }
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
