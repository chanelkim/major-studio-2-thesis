<template>
  <div class="container">
    <div class="logo">
      <img :src="logo" />
    </div>
    <div class="hero">
      <img :src="hero" />
    </div>
  </div>
</template>

<script>
import hero from "../assets/png/hero.png";
import logo from "../assets/svg/IoAD_stack.svg";
// import IndexOf from "../assets/svg/IoAD_American.svg";
// import American from "../assets/svg/IoAD_American.svg";
// import Design from "../assets/svg/IoAD_Design.svg";

export default {
  name: "Hero",
  data() {
    return {
      hero,
      logo,
    };
  },
};
</script>

<style>
.container {
  height: 100%;
  max-width: 100%;
  text-align: center;
  align-items: center;
  position: relative;
}
.hero img {
  flex: 1;
  z-index: 0;
  max-height: 1024px;
  width: 100%;
  object-fit: cover;
}
.logo img {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(183deg)
    brightness(102%) contrast(101%);
  flex: 1;
  z-index: 1;
  position: absolute;
  margin: auto;
  width: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
</style>
