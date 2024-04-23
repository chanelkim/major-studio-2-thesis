<template>
  <div>
    <h1>Page X</h1>
    <h3>Discovery Page (Interaction)</h3>
    <p>Metadata for objects pictured in the IoAD</p>

    <!-- Render buttons for each array of sections -->
    <div v-for="(sectionsArray, arrayIndex) in sectionData" :key="arrayIndex">
      <div v-for="(section, sectionTitle) in sectionsArray" :key="sectionTitle">
        <!-- Render button for the section if it's not the showImages property -->
        <template v-if="sectionTitle !== 'showImages'">
          <button
            v-if="isValidButton(section) && sectionTitle !== 'ObjectIDs'"
            @click="toggleImages(section)"
          >
            {{ sectionTitle }}
          </button>
        </template>
        <!-- Recursively render subsections -->
        <div v-if="section.showImages">
          <template
            v-if="typeof section === 'object' && !Array.isArray(section)"
          >
            <button
              v-for="(subSection, subSectionTitle) in section"
              :key="subSectionTitle"
              @click="toggleImages(subSection)"
            >
              <!-- Exclude showImages and ObjectIDs from rendering -->
              <template
                v-if="
                  isValidButton(subSection) &&
                  subSectionTitle !== 'showImages' &&
                  subSectionTitle !== 'ObjectIDs'
                "
              >
                {{ subSectionTitle }}
              </template>
            </button>
          </template>
        </div>
        <!-- Conditionally render images -->
        <div v-if="section.showImages">
          <ImageDisplay
            v-for="(image, index) in images"
            :key="'image-' + index"
            :image-url="image"
          />
        </div>
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
        showImages: false,
      }));
      console.log(this.sections);
    },
    toggleImages(section) {
      // Close all sections
      this.sections.forEach((s) => {
        if (s !== section && s.showImages) {
          s.showImages = false;
        }
      });

      // Toggle the value of showImages for the clicked section
      section.showImages = !section.showImages;

      // Load images if showImages is true
      if (section.showImages) {
        // If the section is an array (i.e., ObjectIDs), load the images directly
        if (Array.isArray(section)) {
          this.loadImages(section);
        } else {
          // Load the ObjectIDs array for the subsection
          const objectIDs = section.ObjectIDs;
          this.images = objectIDs.map((id) => {
            const matchingItem = this.ngaData.find(
              (item) => item.objectid === id
            );
            return matchingItem ? matchingItem.imagematch : null;
          });
        }
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
    isValidButton(subSection) {
      return (
        typeof subSection === "object" &&
        !Array.isArray(subSection) &&
        subSection !== null &&
        Object.keys(subSection).length > 0
      );
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
