import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import Blog from "./components/Blog.vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);
Vue.use(VueAxios, axios);

new Vue({
  el: "#blog",
  render: h => h(Blog)
});
