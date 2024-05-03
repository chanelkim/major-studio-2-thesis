<template>
  <div>
    <h1>Page X</h1>
    <h3>The Collection</h3>
    <p>IoAD Today: a set of watercolors</p>
  </div>
  <div>
    <ul>
      <li v-for="(artist, index) in allArtists" :key="index">
        <p>{{ artist.name }}</p>
        <ul>
          <li v-for="(title, i) in artist.titles" :key="i">
            {{ title.title }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div><Treemap :createTreemap="treemapElement" /></div>
</template>

<script>
import Treemap from "./Treemap.vue";

const MAX_SVG_WIDTH = 1920;

export default {
  name: "Collection",
  components: {
    Treemap,
  },
  data() {
    return {
      width: Math.min(MAX_SVG_WIDTH, window.innerWidth), // Initialize width based on window size
    };
  },
  props: {
    ngaData: Array,
    allArtists: Array,
  },
  methods: {},
  mounted() {
    console.log(this.allArtists);
  },
};
</script>

<style>
p {
  color: black;
}
</style>
