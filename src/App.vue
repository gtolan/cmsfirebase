<template>
  <div id="app">
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link>|
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/blog">Blog</router-link>|
      <router-link to="/add-blog-article">Add Blog Article</router-link>|
      <router-link to="/products">Products</router-link>|
      <router-link to="/products/add-product">Add Product</router-link>|
      <router-link to="/products/categories">Categories</router-link>|
      <h1>Logged In:{{isLoggedIn}}</h1>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState({
      token: state => state.authentication.token
      //   b: state => state.b
    }),
    isLoggedIn() {
      return this.token ? true : false;
    }
  }
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
