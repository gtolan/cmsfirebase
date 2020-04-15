<template>
  <div class="send-message">
    <Modal :isOpen="sendMessageModalOpen">
      <form @submit.prevent="handleFormSubmit">
        <select v-model="toUser" @change="handleSelectChange($event)">
          <option :value="rec.uid" v-for="(rec,ind) in recipients" :key="ind">{{rec.displayName}}</option>
        </select>
        <textarea v-model="message" />
        <button type="submit">Send Message</button>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Modal from "@/components/shared/Modal";

export default {
  name: "SendMessage",
  components: {
    Modal
  },
  data() {
    return {
      selectedRecipent: "",
      time: "01-01-2021",
      message: "",
      toUser: ""
    };
  },
  computed: {
    ...mapState({
      fromUser: state => state.messageUsers.fromUser,
      recipients: state => {
        let messageSender = state.messageUsers.fromUser;
        console.log(messageSender, "messageSender");
        let recips = state.authentication.users.map(it => {
          console.log(it.uid, "it");
          return it.uid != messageSender ? it : "";
        });
        console.log(recips, "recips");
        return recips;
      },
      sendMessageModalOpen: state => state.components.sendMessageModal
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
      console.log(pay, "Pay after sub");
      this["messageUsers/writeNewMessage"](pay);
    },
    handleSelectChange(event) {
      console.log(event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  textarea {
    min-height: 149px;
    overflow-y: scroll;
    max-height: 170px;
    resize: none;
    border-radius: 3px;
    border: 1px solid lightgray;
    margin: 10px 0px;
    padding: 0.5rem;
    outline: none;
    cursor: pointer;
  }
  select {
    height: 2.25rem;
    border-radius: 3px;
    font-size: 0.9rem;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
  button {
    height: 2.25rem;
    border-radius: 3px;
    font-size: 0.9rem;
    background-color: dodgerblue;
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }
}
</style>