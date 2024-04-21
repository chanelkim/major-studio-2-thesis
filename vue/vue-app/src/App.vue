<!-- MENU ITEMS -->
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link class="margin-x" to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link class="margin-x" to="/collection">Collection</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link class="margin-x" to="/methodology"
          >Methodology</router-link
        >
      </el-menu-item>
      <el-menu-item index="4">
        <router-link class="margin-x" to="/discover">Discover</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link class="margin-x" to="/history">History</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link class="margin-x" to="/acknowledgments"
          >Acknowledgments</router-link
        >
      </el-menu-item>
      <el-menu-item index="7">
        <router-link class="margin-x" to="/references">References</router-link>
      </el-menu-item>
    </el-menu>
    <router-view
      :catalogData="catalogData"
      :ngaData="ngaData"
      :sectionData="sectionData"
    ></router-view>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "App",
  components: {},
  data() {
    return {
      catalogData: {},
      ngaData: [],
      sectionData: [],
    };
  },
  mounted() {
    const jsonPaths = [
      "./data/catalog_categories.json",
      "./data/IoAD_merged_geo_data.json",
      "./data/sections/textile_section_0.json",
      "./data/sections/utopian_section_1.json",
      "./data/sections/architecture_section_2.json",
      "./data/sections/tool_section_3.json",
      "./data/sections/domestic_section_4.json",
      "./data/sections/furniture_section_5.json",
      "./data/sections/wood_section_6.json",
      "./data/sections/ceramic_section_7.json",
      "./data/sections/silver_section_8.json",
      "./data/sections/toy_section_9.json",
    ];

    // Use Promise.all() to load multiple JSON files concurrently
    Promise.all(
      jsonPaths.map((path) =>
        // Fetch each JSON file
        d3.json(path)
      )
    )
      .then((dataArray) => {
        this.catalogData = dataArray[0];
        this.ngaData = dataArray[1];
        // Concatenate the rest of the arrays into a single array
        this.sectionData = dataArray.slice(2).flat();
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
  },
};
</script>

<style>
.margin-x {
  margin: 0px 5px;
}
body {
  background-color: #faffff;
}
</style>
