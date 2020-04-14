<template>
  <div class="send-message">
    <form @submit.prevent="handleFormSubmit">
      <textarea v-model="message" />
      <button type="submit">Send Message</button>
      <select v-model="fromUser" @change="handleSelectChange($event)">
        <option :value="rec.uid" v-for="(rec,ind) in recipients" :key="ind">{{rec.displayName}}</option>
      </select>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "SendMessage",
  data() {
    return {
      selectedRecipent: "",
      time: "01-01-2021",
      message: "",
      toUser: "5Jy4SwwbIZWSMJKf2t20IcXQ2n63",
      fromUser: ""
    };
  },
  computed: {
    ...mapState({
      recipients: state => {
        let messageSender = state.messageUsers.fromUser;
        console.log(messageSender, "messageSender");
        let recips = state.authentication.users.map(it => {
          console.log(it.uid, "it");
          return it.uid != messageSender ? it : "";
        });
        console.log(recips, "recips");
        return recips;
      }
      //   b: state => state.b
    })
  },
  methods: {
    ...mapActions(["messageUsers/writeNewMessage"]),
    handleFormSubmit() {
      console.log(this.fromUser, "FROM");
      let { time, message, toUser, fromUser } = this;
      let pay = {
        time,
        message,
        toUser,
        fromUser
      };
      this["messageUsers/writeNewMessage"](pay);
    },
    handleSelectChange(event) {
      console.log(event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>