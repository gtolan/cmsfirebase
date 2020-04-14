<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Register />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Register from "@/components/Register.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Register
  }
};
</script>
