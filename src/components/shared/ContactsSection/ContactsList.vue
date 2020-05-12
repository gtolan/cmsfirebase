<template>
  <div class="user-container" id="contactCon">
    <div class="card" v-for="(user, ind) in usersList" :key="ind">
      <img class="profile-image" :src="user.profileImage" alt="profile image" />
      <p @click="handleOpenMailBox(user.id)">{{user.displayName}}</p>
      <p class="status" :class="{'offline':usersList ? !user.online : ''}">
        <span class="md-screen">{{user.online | isOnline}}</span>
        <span class="sm-screen">
          <!-- ON -->
          <span v-if="user.online">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
              <path
                d="M2.06 10.06c.51.51 1.32.56 1.87.1 4.67-3.84 11.45-3.84 16.13-.01.56.46 1.38.42 1.89-.09.59-.59.55-1.57-.1-2.1-5.71-4.67-13.97-4.67-19.69 0-.65.52-.7 1.5-.1 2.1zm7.76 7.76l1.47 1.47c.39.39 1.02.39 1.41 0l1.47-1.47c.47-.47.37-1.28-.23-1.59-1.22-.63-2.68-.63-3.91 0-.57.31-.68 1.12-.21 1.59zm-3.73-3.73c.49.49 1.26.54 1.83.13 2.44-1.73 5.72-1.73 8.16 0 .57.4 1.34.36 1.83-.13l.01-.01c.6-.6.56-1.62-.13-2.11-3.44-2.49-8.13-2.49-11.58 0-.69.5-.73 1.51-.12 2.12z"
              />
            </svg>
          </span>

          <!-- OFF -->
          <span v-if="!user.online">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.06 10.14c.56.46 1.38.42 1.89-.09.59-.59.55-1.57-.1-2.1-3.59-2.94-8.2-4.03-12.55-3.26l2.59 2.59c2.89-.03 5.8.92 8.17 2.86zm-2.27 1.83c-.78-.57-1.63-1-2.52-1.3l2.95 2.95c.24-.58.1-1.27-.43-1.65zm-3.84 4.26c-1.22-.63-2.68-.63-3.91 0-.59.31-.7 1.12-.23 1.59l1.47 1.47c.39.39 1.02.39 1.41 0l1.47-1.47c.49-.47.39-1.28-.21-1.59zm5.73 1.67L4.12 2.34c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L5.05 6.1c-1.01.5-1.99 1.11-2.89 1.85-.65.53-.69 1.51-.1 2.1.51.51 1.32.56 1.87.1 1-.82 2.1-1.46 3.25-1.93l2.23 2.23c-1.13.3-2.21.8-3.19 1.51-.69.5-.73 1.51-.13 2.11l.01.01c.49.49 1.26.54 1.83.13 1.19-.84 2.58-1.26 3.97-1.29l6.37 6.37c.39.39 1.02.39 1.41 0 .39-.37.39-1 0-1.39z"
              />
            </svg>
          </span>
        </span>
      </p>
      <button class="send-message" @click="handleOpenMailBox(user.id)">
        <span v-if="uid != user.id" class="md-screen">Send Message</span>
        <span v-if="uid == user.id" class="md-screen">Open Mailbox</span>
        <span class="sm-screen">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"
            />
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ContactsList",
  data() {
    return {
      fromUser: "", //List
      searchUser: "", //List
      sortAZ: false //List
    };
  },
  filters: {
    isOnline: function(value) {
      return value == true ? "Online" : "Offline";
    }
  },
  //List
  computed: {
    ...mapState({
      users: state => state.authentication.users,
      usersList: state => state.authentication.usersList,
      uid: state => state.authentication.uid
      //   b: state => state.b
    })
  },
  methods: {
    ...mapMutations([
      "messageUsers/writeFromUser",
      "components/toggleSendMessage",
      "messageUsers/writeToUser"
    ]),

    handleSendMessage(toUserUID) {
      this["messageUsers/writeFromUser"](this.uid);
      this["messageUsers/writeToUser"](toUserUID);
      this["components/toggleSendMessage"]();
    },
    handleOpenMailBox(id) {
      if (id === this.uid) {
        this.$router.push(`/dashboard/mail/${id}`);
      } else {
        this.handleSendMessage(id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.add-article {
  min-width: 200px;
  text-decoration: none;
  height: 2rem;
  display: block;
  max-width: 300px;
  margin: auto;
  background-color: #143e8c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 30px;
  height: 2.5rem;
  transition: 0.3s ease-in-out;
  color: white;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  &:hover {
    background-color: #1d56bf;
  }
}
.user-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  .card {
    width: 95%;
    margin: 3px 2.5%;

    border: 1px solid #80808040;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    img.profile-image {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      margin-left: 10px;
      border-radius: 50%;
      margin-right: 1rem;
    }
    p {
      padding-left: 10px;
    }
    p.status {
      width: 2rem;
      background-color: green;
      height: 100%;
      margin: 0;
      margin-left: auto;
      margin-right: 1px;
      min-height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 0.97rem;
      font-weight: 600;
      letter-spacing: 1px;
      transition: 0.3s ease-in-out;
      flex-direction: column;
      align-content: center;
      padding: 0;
      padding: 1px 7px 0px;
      svg {
        fill: white;
      }

      &.offline {
        background-color: red;
        &:hover {
          background-color: #980d0d;
        }
      }
      &:hover {
        background-color: #0e630e;
      }
    }
    button {
      cursor: pointer;
      border: none;
      transition: 0.3s ease-in-out;
      background-color: #143e8c;
      color: white;
      font-size: 0.97rem;
      font-weight: 600;
      letter-spacing: 1px;

      padding: 0px 9px;
      &:hover {
        background-color: #1d56bf;
      }
      svg {
        fill: white;
      }
    }
  }
}
@media only screen and (min-width: 500px) {
  .contact-controls {
    width: 90%;
    margin: 2% 5%;
  }
  .user-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .card {
      width: 90%;
      margin: 3px 5%;
    }
  }
}

.sm-screen {
  display: block;
}

.md-screen {
  display: none;
}

@media only screen and (min-width: 700px) {
  .sm-screen {
    display: none !important;
  }

  .md-screen {
    display: block;
  }
  .user-container {
    .card {
      button {
        padding: 0px 40px;
      }
    }
  }
  .card p.status {
    width: 22% !important;
    background-color: green;
    height: 100%;
    margin: 0;
    margin-left: auto;
    margin-right: 1px;
    min-height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.97rem;
    font-weight: 600;
    letter-spacing: 1px;
    transition: 0.3s ease-in-out;
  }
  .card button.send-message {
    min-width: 200px;
  }
}
</style>