<template>
  <div class="wip">
    <p>Under Construction</p>
  </div>
  <div class="header">
    <h1>Collection</h1>
    <h2>Index by Artist</h2>
  </div>
  <div class="description">
    <p>Zoomable Treemap</p>
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

<style></style>
