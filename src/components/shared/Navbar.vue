<template>
  <nav id="nav">
    <Hamburger />
    <router-link to="/">Home</router-link>
    <router-link to="/dashboard">Dashboard</router-link>

    <button class="dropdown" @click="toggleDropdown">
      <div class="header">
        Blog
        <button class="collapse" :class="{'active':this.blogMenuOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </button>
      </div>
      <div class="menu" :class="{'active':blogMenuOpen}">
        <router-link class="menu-item" to="/blog">Blog</router-link>
        <router-link class="menu-item" to="/add-blog-article">Add Blog Article</router-link>
      </div>
    </button>

    <router-link to="/products">Products</router-link>
    <LoggedInAvatar />
    <!-- <p>Logged In:{{isLoggedIn}}</p> -->
  </nav>
</template>

<script>
import Hamburger from "@/components/shared/Hamburger.vue";
import LoggedInAvatar from "@/components/shared/LoggedInAvatar.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Navbar",
  components: {
    Hamburger,
    LoggedInAvatar
  },
  data() {
    return {
      //   blogMenuOpen: false
    };
  },
  computed: {
    ...mapState({
      token: state => state.authentication.token,
      blogMenuOpen: state => state.components.blogMenuOpen
      //   b: state => state.b
    }),
    isLoggedIn() {
      return this.token ? true : false;
    }
  },
  methods: {
    ...mapMutations(["components/toggleBlogMenuOpen"]),
    toggleDropdown() {
      console.log("toggle", this.blogMenuOpen);
      //   this.blogMenuOpen = !this.blogMenuOpen;
      this["components/toggleBlogMenuOpen"]();
    }
  }
};
</script>

<style lang="scss" scoped>
nav#nav {
  padding: 0;
  background-color: #143f8c;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 3rem;
  position: fixed;
  width: 100vw;
  top: 0;

  a,
  button.dropdown, //:not(.hamburger)
  p {
    font-weight: bold;
    color: white;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    flex-direction: column;
    text-decoration: none;
    transition: 0.3s ease-in-out;
    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: #235cc5;
    }
    &.router-link-exact-active {
      color: white;
      background-color: #0c2656;
      &:hover {
        background-color: #103477;
      }
    }
  }
}

// Extract to Dropdown Component
button.dropdown {
  .header {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    min-width: calc((100vw - 5rem) / 5);
    position: relative;
    font-size: 0.97rem;

    button.collapse {
      position: absolute;
      right: 11px;
      top: 14px;
      height: 39px;
      padding: 0;
      width: 41px;
      justify-content: center;
      align-content: center;
      display: flex;
      border-radius: 50%;
      outline: none;
      cursor: pointer;
      position: absolute;
      width: 40px;
      right: 0;
      height: 100%;
      top: 0;
      background-color: transparent;
      height: 35px;
      width: 35px;
      border: none;
      margin-top: 7px;
      margin-right: 10px;
      svg {
        transform: rotate(90deg);
        transition: 0.3s ease-in-out;
        height: 35px;
        width: 35px;
        fill: white;
      }
      &.active {
        svg {
          transform: rotate(270deg);
        }
      }
    }
  }
}
@keyframes scaleOpenMenu {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.menu {
  visibility: hidden;
  position: absolute;
  top: 3rem;
  background: #143e8c;
  width: auto;
  min-width: calc((100vw - 1rem) / 5);
  // min-width: calc((100vw - 1rem) / 5);
  max-width: calc((100vw - 1rem) / 3);
  width: 100%;
  text-align: left;
  padding: 1rem;
  //   animation: scaleOpenMenu 0.5s ease-in-out;
  //   animation-fill-mode: forwards;
  //   animation-direction: reverse;
  transform: scale(0);
  will-change: transform;
  transition: 1s;
  background-color: white;
  color: black;
  border: 1px solid lightgray;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 3px;
  margin-top: 3px;
  padding: 0;
  overflow: hidden;
  transform-origin: left top;

  &.active {
    display: block;

    // animation: scaleOpenMenu 0.5s ease-in-out;
    // animation-fill-mode: forwards;
    visibility: visible;
    transform: scale(1);
  }
  a.menu-item {
    color: black !important;
    height: 2rem !important;
    background-color: white !important;
    padding-left: 10px !important;
    font-size: 1rem;
    border-top: 1px solid #80808033 !important;
    width: calc(100% - 11px) !important;
    &:hover {
      background: whitesmoke !important;
    }
  }
}
</style>