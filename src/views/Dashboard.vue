<template>
  <main>
    <h1>Dashboard</h1>
    <LatestBlog />
    <SendMessage />

    <button @click="handleLogout">Logout</button>
    <div class="user-container">
      <div class="card" v-for="(user, ind) in users" :key="ind">
        <p @click.self="handleOpenMailBox(user.id)">NAME:{{user.displayName}}</p>
        <p>Status:{{user.online | isOnline}}</p>
        <button class="send-message" @click.self="handleSendMessage(user.id)">Send Message</button>
        <!-- <h1 v-if="user.messages.length > 1">Messages:</h1> -->
        <!-- <div class="message" v-for="(mess,ind) in user.messages" :key="ind">
          <h4 v-if="mess">To User{{mess ? mess.toUser : '' }}</h4>
          <h4 v-if="mess">From User:{{mess ? mess.fromUser : ''}}</h4>
          <h4 v-if="mess">Message:{{mess ? mess.message : ''}}</h4>
          <h4 v-if="mess">Time:{{mess ? mess.time : ''}}</h4>
        </div>-->
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SendMessage from "@/components/SendMessage.vue";
import LatestBlog from "@/components/LatestBlog.vue";

export default {
  name: "Dashboard",
  components: {
    SendMessage,
    LatestBlog
  },
  data() {
    return {
      fromUser: ""
    };
  },
  filters: {
    isOnline: function(value) {
      return value == true ? "Online" : "Offline";
    }
  },

  computed: {
    ...mapState({
      users: state => state.authentication.users,
      uid: state => state.authentication.uid
      //   b: state => state.b
    })
  },
  methods: {
    ...mapActions(["authentication/fetchUsers", "authentication/logout"]),
    ...mapMutations([
      "messageUsers/writeFromUser",
      "components/toggleSendMessage"
    ]),
    handleLogout() {
      console.log(this.uid, "logemout");
      this["authentication/logout"](this.uid);
    },
    handleFetchUsers() {
      this["authentication/fetchUsers"]();
    },
    handleSendMessage(uid) {
      this.fromUser = uid;
      this["messageUsers/writeFromUser"](uid);

      this["components/toggleSendMessage"]();
    },
    handleOpenMailBox(id) {
      this.$router.push(`/dashboard/${id}`);
    }
  },
  created() {
    this.handleFetchUsers();
  }
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 3rem;
}
.user-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .card {
    width: 90%;
    margin: 2% 5%;
    border: 1px solid grey;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p {
      padding-left: 10px;
    }
    button {
      cursor: pointer;
      border: none;
      transition: 0.3s ease-in-out;
      background-color: #143e8c;
      color: white;
      font-size: 0.9rem;
      &:hover {
        background-color: dodgerblue;
      }
    }
  }
}
</style>