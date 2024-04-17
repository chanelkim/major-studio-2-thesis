<template>
  <div>
    <!-- <h1>{{ title }}</h1> -->
    <!-- <h2>{{ subtitle }}</h2> -->
    <Hero />
    <teleport to="#modals" v-if="showModal">
      <Modal theme="success" @close="toggleModal">
        <template v-slot:links>
          <a href="#">sign up now</a>
          <a href="#">more info</a>
        </template>
        <h1>Slot Example</h1>
        <p>lorem ipsum</p>
      </Modal>
    </teleport>

    <teleport to="#modals" v-if="showModalTwo">
      <Modal @close="toggleModalTwo">
        <h1>Sign up for the newsletter</h1>
        <p>For updates and promo codes</p>
      </Modal>
    </teleport>

    <button @click="toggleModal">open modal success</button>
    <button @click="toggleModalTwo">open modal two</button>
    <SearchBar />
  </div>
</template>

<script>
import Hero from "./Hero.vue";
import Modal from "./Modal.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Home",
  components: {
    Hero,
    Modal,
    SearchBar,
  },
  data() {
    return {
      title: "Index of American Design",
      subtitle: "Making an Obscure Collection Discoverable",
      header: "Testing Modal Header",
      text: "Testing Modal Text",
      showModal: false,
      showModalTwo: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
body {
  margin: 0px;
}
#app,
#modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.recommendation-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
@media (max-width: 768px) {
  .recommendation-group {
    flex-direction: column;
    align-items: center;
  }
}
.card {
  width: 300px;
}
</style>
