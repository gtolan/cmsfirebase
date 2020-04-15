<template>
  <div id="app">
    <Navbar />
    <SideNav />
    <vue-page-transition name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </div>
</template>
<script>
import Vue from "vue";
import VuePageTransition from "vue-page-transition";
Vue.use(VuePageTransition);

import Navbar from "@/components/shared/Navbar.vue";
import SideNav from "@/components/shared/SideNav.vue";
// const DEFAULT_TRANSITION = "fade";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Navbar,
    SideNav
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style >
body {
  margin: 0;
}
</style>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
