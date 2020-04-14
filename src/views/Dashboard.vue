<template>
  <div>
    <h1>Dashboard</h1>
    <SendMessage />
    <h4>Add users to Firestore - toggle Online status</h4>
    <p>-have observable show online users</p>
    <p>features:</p>
    <ul>
      <li>whatsapp style messaging/push notifications</li>
      <li>money transfer</li>
      <li>Games - share images</li>
    </ul>
    <div class="user-container">
      <div class="card" v-for="(user, ind) in users" :key="ind">
        <p>UID:{{user.id}}</p>
        <p>EMAIL:{{user.email}}</p>
        <p>NAME:{{user.displayName}}</p>
        <p>Status:{{user.online | isOnline}}</p>
        <button class="send-message" @click="handleSendMessage(user.id)">Send Message</button>
        <h1 v-if="user.messages.length > 1">Messages:</h1>
        <div class="message" v-for="(mess,ind) in user.messages" :key="ind">
          <h4 v-if="mess">To User{{mess ? mess.toUser : '' }}</h4>
          <h4 v-if="mess">From User:{{mess ? mess.fromUser : ''}}</h4>
          <h4 v-if="mess">Message:{{mess ? mess.message : ''}}</h4>
          <h4 v-if="mess">Time:{{mess ? mess.time : ''}}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SendMessage from "@/components/SendMessage.vue";

export default {
  name: "Dashboard",
  components: {
    SendMessage
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
      users: state => state.authentication.users
      //   b: state => state.b
    })
  },
  methods: {
    ...mapActions(["authentication/fetchUsers"]),
    ...mapMutations(["messageUsers/writeFromUser"]),
    handleFetchUsers() {
      this["authentication/fetchUsers"]();
    },
    handleSendMessage(uid) {
      this.fromUser = uid;
      this["messageUsers/writeFromUser"](uid);
    }
  },
  created() {
    this.handleFetchUsers();
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .card {
    width: 90%;
    margin: 2% 5%;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>