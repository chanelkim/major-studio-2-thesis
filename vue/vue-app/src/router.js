import * as VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Methodology from "./components/Methodology";
import Acknowledgments from "./components/Acknowledgments.vue";
import References from "./components/References.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/methodology", component: Methodology },
  { path: "/acknowledgments", component: Acknowledgments },
  { path: "/references", component: References },
];
export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});
