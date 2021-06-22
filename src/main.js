import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import CoreUiVue from "@coreui/vue";

Vue.config.performance = true;
Vue.config.productionTip = false;
Vue.use(CoreUiVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
