import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { router } from "./router";
import "./assets/global.css";

createApp(App).use(router).use(ElementPlus).mount("#app");
