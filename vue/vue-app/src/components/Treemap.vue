<template>
  <!-- <div v-tooltip="{ content: d.data.name }">
    <div ref="treemapContainer"></div>
  </div> -->

  <div ref="treemapContainer"></div>
</template>

<script>
// import * as d3 from "d3";

export default {
  name: "Treemap",
  //   data() {
  //     return {
  //       allArtists: [],
  //     };
  //   },
  props: {
    ngaData: Array,
  },
  //   mounted() {
  //     // Refactored Treemap Code
  //     const treemapElement = this.createTreemap(this.ngaData);
  //     this.$refs.treemapContainer.appendChild(treemapElement);
  //   },
  computed: {
    analyzeData() {
      const allArtists = [];

      this.ngaData.forEach((artwork) => {
        const {
          attribution: artistName,
          title,
          objectid,
          imagematch,
          geostate,
          geodivision,
          georegion,
          catstate,
        } = artwork; // Destructuring

        const artist = allArtists.find((p) => p.name === artistName);

        if (!artist) {
          allArtists.push({
            name: artistName,
            titles: [
              // Create title object inline
              {
                title: title,
                objectid: objectid,
                imagematch: imagematch || "Image not available",
                geodivision: geodivision || "Unknown regional division",
                georegion: georegion || "Unknown region",
                geostate: geostate || "Unknown state",
                catstate: catstate || "Unknown catalog state",
              },
            ],
            count: 1,
          });
        } else {
          artist.titles.push({
            title: title,
            objectid: objectid,
            imagematch: imagematch || "Image not available",
            geodivision: geodivision || "Unknown regional division",
            georegion: georegion || "Unknown region",
            geostate: geostate || "Unknown state",
            catstate: catstate || "Unknown catalog state",
          });
          artist.count++;
        }
      });
      return allArtists;
    },
  },
  methods: {},
  mounted() {
    // Emit the allArtists array when the component is mounted
    this.$emit("artists-updated", this.analyzeData);
  },
};
</script>
