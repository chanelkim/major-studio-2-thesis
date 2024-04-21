<template>
  <div>
    <h1>Page X</h1>
    <h3>Discovery Page (Interaction)</h3>
    <p>Metadata for objects pictured in the IoAD</p>
    <!-- Render buttons based on array of objects -->
    <div v-for="(section, index) in sections" :key="index">
      <button @click="toggleImages(section)">
        {{ Object.keys(section)[0] }}
        <!-- Get the key of the object as the title -->
      </button>
      <!-- Conditionally render images -->
      <div class="display" v-if="section.showImages">
        <ImageDisplay
          v-for="(image, index) in images"
          :key="'image-' + index"
          :image-url="image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImageDisplay from "./ImageDisplay.vue";

export default {
  name: "Discover",
  components: {
    ImageDisplay,
  },
  data() {
    return {
      sections: [],
      images: [],
      matchingItems: [],
    };
  },
  props: {
    sectionData: Array,
    ngaData: Array,
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.sections = this.sectionData.map((section) => ({
        ...section,
        showImages: false, // Add showImages property to each section
      }));
      console.log(this.sections);
    },
    toggleImages(section) {
      // Toggle the value of showImages
      section.showImages = !section.showImages;

      // Load images if showImages is true
      if (section.showImages) {
        this.loadImages(section);
      }
    },
    loadImages(section) {
      const objectIDs = [];

      // Define a recursive function to traverse nested objects
      const traverse = (obj) => {
        // Check if the current object has ObjectIDs property
        if (obj && obj.ObjectIDs) {
          // Extract ObjectIDs from the current object
          objectIDs.push(...obj.ObjectIDs);
        } else if (typeof obj === "object" && !Array.isArray(obj)) {
          // If ObjectIDs are not found and the current object is an object (not an array)
          // Continue traversing through nested objects
          for (const key in obj) {
            traverse(obj[key]);
          }
        }
      };

      // Call the traverse function with the section object
      traverse(section);

      // Fetch URLs for the ObjectIDs from ngaData
      this.images = objectIDs.map((id) => {
        const matchingItem = this.ngaData.find((item) => item.objectid === id);
        console.log(matchingItem);
        return matchingItem ? matchingItem.imagematch : null;
      });
    },
  },
};
</script>

<style scoped>
.display {
  overflow: hidden;
  /* padding: 2rem; */
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 0.5rem;
}
</style>
