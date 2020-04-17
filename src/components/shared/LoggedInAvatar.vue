<template>
  <button title="Profile menu" class="avatar" @click="handleToggleProfileMenu">
    <div class="img-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/cms-example-1e6fa.appspot.com/o/smile.jpg?alt=media&token=da6716a0-07a0-420d-b87c-3839489ffc0f"
      />
      <div class="profile-menu" :class="{'active':isActive}">
        <button>My Profile</button>
        <button>Edit Profile</button>
        <button>Contacts</button>
        <button>Messages</button>
        <button>News Feed</button>
        <button>Get Advice</button>
        <button>Share Advice</button>
        <button>Give Advice</button>
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
      isActive: state => state.components.profileMenuOpen,
      isOverlayActive: state => state.components.isOverlayActive,
      isOverlaySoft: state => state.components.isOverlaySoft,
      sideNavOpen: state => state.components.sideNavOpen,
      blogMenuOpen: state => state.components.blogMenuOpen
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
      "components/toggleProfileMenu",
      "components/addSoftOverlay",
      "components/toggleOverlayOpen",
      "components/removeSoftOverlay" // map `this.fetchCurrentTrains()` to `this.$store.dispatch('fetchCurrentTrains')`
    ]),
    handleOverlayOpen() {
      console.log("handle open", this.isOverlayActive);
      if (!this.isOverlayActive) {
        console.log("handle open soft over");
        this["components/toggleOverlayOpen"]();
      }
      this["components/addSoftOverlay"]();
    },
    handleOverlayClose() {
      if (this.isOverlayActive) {
        console.log("HOC,BTP", this.blogMenuOpen, this.sideNavOpen);
        if (this.blogMenuOpen || this.sideNavOpen) {
          console.log("add sof");
          this["components/addSoftOverlay"]();
          //   this["components/toggleOverlayOpen"]();
        } else {
          console.log("remov all sof");
          this["components/toggleOverlayOpen"]();
          this["components/removeSoftOverlay"]();
        }
        console.log("handle close over");
      }
    },

    handleToggleProfileMenu() {
      //   this.isActive = !this.isActive;

      this.isOverlayActive
        ? this.handleOverlayClose()
        : this.handleOverlayOpen();

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
  margin-left: 1rem;
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
      display: flex;
      flex-direction: column;
      button {
        height: 2rem;
        background: transparent;
        border: none;
        border-bottom: 1px solid lightgray;
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          background: #b3aeae3b;
        }
      }

      &.active {
        transform: scale(1);
        visibility: visible;
        min-height: 275px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        overflow: hidden;
        border-bottom-right-radius: 8px;
        border: 1px solid lightgray;
      }
    }
  }
}

@media only screen and (min-width: 700px) {
  .profile-menu {
    top: 3.24rem !important;
  }
}
</style>