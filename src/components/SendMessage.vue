<template>
  <div class="send-message">
    <Modal :isOpen="sendMessageModalOpen">
      <form @submit.prevent="handleFormSubmit">
        <div v-if="!messageSent" class="write-message">
          <select v-model="toUserSelect" @change="handleSelectChange($event)">
            <option :value="rec.uid" v-for="(rec,ind) in recipients" :key="ind">{{rec.displayName}}</option>
          </select>
          <textarea v-model="message" />
          <button type="submit">Send Message</button>
        </div>
        <div v-if="messageSent" class="success">
          <h1>Message Sent!</h1>
        </div>
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
      toUserSelect: "",
      messageSent: false
    };
  },
  computed: {
    ...mapState({
      fromUser: state => state.messageUsers.fromUser,
      toUser: state => state.messageUsers.toUser,
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

  watch: {
    // whenever question changes, this function will run
    sendMessageModalOpen: function(prev, latest) {
      if (prev) {
        this.messageSent = latest; //false
        console.log("resest the FORRRRM");
      }
    }
  },
  updated() {
    console.log("updated to reset form");
    //this.messageSent = false;
  },
  created() {
    console.log("CREated to reset form");
  },
  methods: {
    ...mapActions(["messageUsers/writeNewMessage"]),
    handleFormSubmit() {
      console.log(this.fromUser, "FROM");
      let { time, message, toUser, fromUser } = this;
      let user;
      if (this.toUserSelect != "") {
        user = this.toUserSelect;
      } else {
        user = toUser;
      }

      let pay = {
        time,
        message,
        toUser: user,
        fromUser
      };
      console.log(pay, "Pay after sub");
      this["messageUsers/writeNewMessage"](pay).then(() => {
        console.log("message sent");
        this.messageSent = true;
      });
    },
    handleSelectChange(event) {
      console.log(event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
form div.write-message {
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