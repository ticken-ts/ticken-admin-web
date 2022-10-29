import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "quasar/src/css/index.sass";
import "quasar/src/css/flex-addon.sass";

import App from "@/App.vue";
import router from "@/router";

import "@/assets/base.css";

const app = createApp(App);
const pinia = createPinia();

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");
