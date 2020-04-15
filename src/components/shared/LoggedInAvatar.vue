<template>
  <button class="avatar" @click="handleToggleProfileMenu">
    <div class="img-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cms-example-1e6fa.appspot.com/o/smile.jpg?alt=media&token=da6716a0-07a0-420d-b87c-3839489ffc0f"
      />
      <div class="profile-menu" :class="{'active':isActive}">
        <h1>Profile Menu</h1>
      </div>
    </div>
  </button>
</template>

<script>
import { mapMutations, mapState } from "vuex";
//mapState
export default {
  name: "LoggedInAvatar",
  computed: {
    ...mapState({
      isActive: state => state.components.profileMenuOpen
      //   b: state => state.b
    })
    // isActive2() {
    //   return this.$store.getters["components/sideNavOpen"];
    // }
  },
  //   data() {
  //     return {
  //       isActive: false
  //     };
  //   },
  methods: {
    ...mapMutations([
      "components/toggleProfileMenu" // map `this.fetchCurrentTrains()` to `this.$store.dispatch('fetchCurrentTrains')`
    ]),
    // handleToggleProfileMenu() {
    //   console.log("hanldeToggleProfileMenu");
    //   if (!this.isActive) return;
    //   this.isActive = !this.isActive;
    //   this["components/toggleProfileMenu"]();
    // },
    handleToggleProfileMenu() {
      this.isActive = !this.isActive;
      this["components/toggleProfileMenu"]();
    }
  }
};
</script>

<style lang="scss" scoped>
button.avatar {
  background: transparent;
  width: 106px;
  padding: 0;
  margin-right: 1rem;
  height: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  .img-container {
    width: 36px;
    // overflow: hidden;
    border-radius: 50%;
    height: 36px;
    margin: 7px auto;
    position: relative;
    transition: 0.3s ease-in-out;
    box-shadow: 0px 0px 1px 2px #143e8c, 0px 0px 1px 4px white;
    &:hover {
      box-shadow: 0px 0px 1px 2px #143e8c, 0px 0px 1px 4px pink;
    }
    img {
      width: 100%;
      border-radius: 50%;
      width: 36px;
      height: 36px;
    }
    .profile-menu {
      position: absolute;
      top: 2.7rem;
      right: -6px;
      background: white;
      width: 250px;
      transform: scale(0);
      visibility: hidden;
      box-shadow: 0px 0px 3px 2px #8080808f;
      transform-origin: right top;
      transition: 0.3s ease-in-out;
      h1 {
        text-align: left;
        padding-left: 1rem;
      }

      &.active {
        transform: scale(1);
        visibility: visible;
        min-height: 300px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
        border-bottom-right-radius: 8px;
        border: 1px solid lightgray;
      }
    }
  }
}
</style>