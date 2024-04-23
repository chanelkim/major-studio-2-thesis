<template>
  <div>
    <p>Categories Bar Chart</p>
    <svg :height="height" :width="width">
      <!-- Render bars using rects -->
      <g class="bars">
        <template v-for="(bar, index) in bars" :key="index">
          <rect
            :x="bar.x"
            :y="bar.y"
            :width="bar.width"
            :height="bar.height"
            fill="blue"
          ></rect>
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";

const marginTop = 20;
const marginRight = 60;
const marginBottom = 20;
const marginLeft = 40;

export default {
  name: "CategoriesBarChart",
  props: {
    transformedData: Array,
    height: Number,
    width: Number,
  },
  computed: {
    bars() {
      return this.transformedData.map((item) => {
        const x = marginLeft;
        const y = this.yScale(item.name);
        const width = this.xScale(item.value) - marginLeft;
        const height = this.yScale.bandwidth();
        return { x, y, width, height };
      });
    },
    xScale() {
      const scale = d3
        .scaleLinear()
        .domain([0, d3.max(this.transformedData, (d) => d.value)])
        .range([marginLeft, this.width - marginRight]);

      return scale;
    },
    yScale() {
      const scale = d3
        .scaleBand()
        .domain(this.transformedData.map((d) => d.name))
        .range([marginTop, this.height - marginBottom])
        .padding(0.1);

      return scale;
    },
  },
};
</script>

<style>
ul {
  color: black;
}
</style>
