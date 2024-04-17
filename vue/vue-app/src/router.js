import * as VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Collection from "./components/Collection.vue";
import Methodology from "./components/Methodology.vue";
import Catalog from "./components/Catalog.vue";
import History from "./components/History.vue";
import Acknowledgments from "./components/Acknowledgments.vue";
import References from "./components/References.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/collection", name: "Collection", component: Collection },
  { path: "/methodology", name: "Methodology", component: Methodology },
  { path: "/catalog", name: "Catalog", component: Catalog },
  { path: "/history", name: "History", component: History },
  {
    path: "/acknowledgments",
    name: "Acknowledgments",
    component: Acknowledgments,
  },
  { path: "/references", name: "References", component: References },
];
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
