<template>
  <div>
    <!-- <h1>{{ title }}</h1> -->
    <!-- <h2>{{ subtitle }}</h2> -->
    <!-- <SearchBar /> -->
    <Media />
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

    <h2>*********************************</h2>
    <h2>Daniel's Lab Code Below [to edit]</h2>
    <h3>Next daytime temperature: {{ firstDaytimePeriod.temperature }}</h3>

    <div class="recommendation-group">
      <div>
        <el-slider v-model="bikeTempRange" range :min="20" :max="90" />
        <BikeRecommender :recommendation="bikeRecommendation" />
      </div>
      <div>
        <el-select
          v-model="selectedUmbrellaOption"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="item in umbrellaOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <UmbrellaRecommender :recommendation="umbrellaRecommendation" />
      </div>
    </div>
    <BarChart :data="periods" :height="400" :width="width" />
  </div>
</template>

<script>
// import SearchBar from "./SearchBar.vue";
import Modal from "./Modal.vue";
// *********************************
import Media from "./Media.vue";

// *********************************
// Daniel's Lab Code Below [to edit]
import BikeRecommender from "./BikeRecommender.vue";
import UmbrellaRecommender from "./UmbrellaRecommender.vue";
import BarChart from "./BarChart.vue";

const API_URL = "https://api.weather.gov/gridpoints/OKX/33,37/forecast";
const MAX_SVG_WIDTH = 600;

export default {
  name: "Home",
  components: {
    // SearchBar,
    Modal,
    // *********************************
    Media,
    // *********************************
    BikeRecommender,
    UmbrellaRecommender,
    BarChart,
  },
  data() {
    return {
      title: "Index of American Design",
      subtitle: "Making an Obscure Collection Discoverable",
      header: "Testing Modal Header",
      text: "Testing Modal Text",
      showModal: false,
      showModalTwo: false,
      // *********************************
      forecast: null,
      umbrellaOptions: ["Rain", "Showers", "Thunderstorms"],
      selectedUmbrellaOption: "Rain",
      bikeTempRange: [45, 80],
      width: MAX_SVG_WIDTH,
    };
  },
  computed: {
    periods() {
      if (!this.forecast || !this.forecast.properties) {
        return [];
      }
      return this.forecast.properties.periods;
    },
    firstDaytimePeriod() {
      const daytimePeriod = this.periods.find((d) => d.isDaytime);
      return daytimePeriod || {};
    },
    bikeRecommendation() {
      const { temperature } = this.firstDaytimePeriod;
      if (temperature === undefined) {
        return null;
      }
      return (
        temperature >= this.bikeTempRange[0] &&
        temperature < this.bikeTempRange[1]
      );
    },
    umbrellaRecommendation() {
      if (!this.periods.length) {
        return false;
      }
      const nextDaytimeForecast = this.forecast.properties.periods.find(
        (d) => d.isDaytime
      );
      if (!nextDaytimeForecast) {
        return false;
      }
      return nextDaytimeForecast.shortForecast.includes(
        this.selectedUmbrellaOption
      );
    },
  },
  methods: {
    handleClick() {
      console.log(this.$refs.name);
      this.$refs.name.classList.add("active");
      this.$refs.name.focus();
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    toggleModalTwo() {
      this.showModalTwo = !this.showModalTwo;
    },
    // *********************************
    onResize() {
      this.width = Math.min(MAX_SVG_WIDTH, window.innerWidth);
    },
  },
  mounted() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        this.forecast = data;
      });

    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
  },
};
// *********************************
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
