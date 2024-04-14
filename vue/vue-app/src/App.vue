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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
