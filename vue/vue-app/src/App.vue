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
        <router-link class="margin-x" to="/catalog">Discover</router-link>
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
    <!-- <router-view></router-view> -->
    <router-view :catalogData="catalogData"></router-view>
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
    };
  },
  computed: {},
  mounted() {
    // Load JSON data using D3
    d3.json("./data/catalog_categories.json")
      .then((data) => {
        this.catalogData = data;
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });
    console.log("catalogData received:", this.catalogData);
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
