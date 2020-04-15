<template>
  <div>
    <h1>User Profile</h1>
    {{$route.params.uid}}
    <router-link :to="`/edit-profile/${$route.params.uid}`">Edit Profile</router-link>|
    <div class="profile-container">
      <!-- //v-for="(pro,ind) in profile" :key="ind" -->
      <button @click="handleEditProfile">Edit Profile</button>
      <div class="left">
        <h3>Name: {{profile ? profile.displayName : ''}}</h3>
        <h3>Email: {{profile ? profile.email : ''}}</h3>
        <h3>Profile Image: {{profile ? profile.displayName : ''}}</h3>
      </div>
      <div class="right">
        <div class="edit" v-if="showEdit">
          <input type="text" v-model="profileName" placeholder="Name" />
          <input type="text" v-model="profileEmail" placeholder="Email" />
          <input type="text" v-model="profileImage" placeholder="Profile Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      routeProfileParams: this.$route.params.uid,
      showEdit: false
    };
  },
  methods: {
    handleEditProfile() {
      console.log("handleEditProfile");
      this.showEdit = !this.showEdit;
    }
  },
  computed: {
    ...mapState({
      users: state => state.authentication.users
      //   b: state => state.b
    }),
    profile() {
      if (!this.users) return;
      let profile = this.users.find(
        user => user.uid == this.routeProfileParams
      );
      if (!profile) return;
      console.log(profile, "profi");
      return profile;
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideInFromRight {
  0% {
    opacity: 0.5;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
.profile-container {
  width: 90%;
  margin: 1rem auto;
  border: 1px solid gray;
  padding: 1rem;
  max-width: 600px;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  button {
    position: absolute;
    width: calc(50% - 0rem);
    padding: 0;
    margin-top: -1rem;
    margin-left: -1rem;
    height: 2rem;
  }
  .left {
    width: 100%;
    h3 {
      text-align: left;
    }
  }
  .right {
    width: 100%;
    overflow: hidden;
    .edit {
      display: flex;
      flex-direction: column;
      transition: 0.3s ease-in-out;
      transform-origin: right;
      animation: slideInFromRight 0.4s ease-in-out;
      animation-fill-mode: forwards;
      input {
        height: 1.42rem;
        border-radius: 3px;
        border: 1px solid lightgrey;
        padding-left: 10px;

        margin: 17px 1px 2px;
        outline: none;
      }
    }
  }
}
</style>