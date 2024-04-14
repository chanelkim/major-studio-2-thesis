import * as VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Collection from "./components/Collection.vue";
import Methodology from "./components/Methodology.vue";
import Catalog from "./components/Catalog.vue";
import History from "./components/History.vue";
import Acknowledgments from "./components/Acknowledgments.vue";
import References from "./components/References.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/collection", component: Collection },
  { path: "/methodology", component: Methodology },
  { path: "/catalog", component: Catalog },
  { path: "/history", component: History },
  { path: "/acknowledgments", component: Acknowledgments },
  { path: "/references", component: References },
];
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
