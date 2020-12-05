import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui"; // 追記
import locale from "element-ui/lib/locale/lang/ja"; // 追記
import "element-ui/lib/theme-chalk/index.css"; // 追記
import firebase from "firebase";

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale }); // 追記

const config = {
  apiKey: "AIzaSyBNkefx9rLYy0c6BPFnQ9ajt7Q_6yezwpQ",
  authDomain: "mixmate-caa21.firebaseapp.com",
  databaseURL: "https://mixmate-caa21.firebaseio.com",
  projectId: "mixmate-caa21",
  storageBucket: "mixmate-caa21.appspot.com",
  messagingSenderId: "765235426305",
  appId: "1:765235426305:web:de0cc6e67c53619b7cbc00",
  measurementId: "G-2PY8XPB2D5"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
