<template>
  <div class="dash-mail">
    <router-link :to="`/profile/${$route.params.uid}`">Profile</router-link>|
    <h1>Mail Inbox</h1>
    {{$route.params.uid | userName(users)}}
    <br />
    <br />
    <!-- {{messages}} -->
    <section class="mail-box inbox">
      <div class="header" :class="{'active':this.inboxOpen}" @click="toggleCollapse('inboxOpen')">
        <h3>Inbox</h3>
        <button :class="{'active':this.inboxOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </button>
      </div>
      <div class="collapse" :class="{'active':this.inboxOpen}">
        <article class="title">
          <h4>From</h4>
          <!-- <h4>To</h4> -->
          <h4>Message</h4>
          <h4>Time</h4>
        </article>
        <article v-for="(mess,ind) in inbox" :key="ind">
          <h4>{{mess.fromUser | userName(users)}}</h4>
          <!-- <h4>{{mess.toUser | userName(users)}}</h4> -->
          <h4>{{mess.message}}</h4>
          <h4>{{mess.time}}</h4>
        </article>
      </div>
    </section>

    <section class="mail-box outbox">
      <div class="header" :class="{'active':this.outboxOpen}" @click="toggleCollapse('outboxOpen')">
        <h3>Outbox</h3>
        <button :class="{'active':this.outboxOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </button>
      </div>
      <div class="collapse" :class="{'active':this.outboxOpen}">
        <article class="title">
          <!-- <h4>From</h4> -->
          <h4>To</h4>
          <h4>Message</h4>
          <h4>Time</h4>
        </article>
        <article v-for="(mess,ind) in outbox" :key="ind">
          <!-- <h4>{{mess.fromUser | userName(users)}}</h4> -->
          <h4>{{mess.toUser | userName(users)}}</h4>
          <h4>{{mess.message}}</h4>
          <h4>{{mess.time}}</h4>
        </article>
      </div>
    </section>
    <section class="mail-box all-mailbox">
      <div
        class="header"
        :class="{'active':this.allMailOpen}"
        @click="toggleCollapse('allMailOpen')"
      >
        <h3>All Messages</h3>
        <button :class="{'active':this.allMailOpen}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
            />
          </svg>
        </button>
      </div>
      <div class="collapse" :class="{'active':this.allMailOpen}">
        <article class="title">
          <h4>From</h4>
          <h4>To</h4>
          <h4>Message</h4>
          <h4>Time</h4>
        </article>
        <article v-for="(mess,ind) in allMailbox" :key="ind">
          <h4>{{mess.fromUser | userName(users)}}</h4>
          <h4>{{mess.toUser | userName(users)}}</h4>
          <h4>{{mess.message}}</h4>
          <h4>{{mess.time}}</h4>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MailInbox",
  data() {
    return {
      allMailOpen: false,
      outboxOpen: false,
      inboxOpen: false
    };
  },
  methods: {
    toggleCollapse(el) {
      return (this[el] = !this[el]);
    }
  },
  computed: {
    ...mapState({
      users: state => state.authentication.users
    }),
    allMailbox() {
      let uid = this.$route.params.uid;
      let user = this.users.find(item => item.uid == uid);
      if (!user.messages.length > 1) return;
      return user.messages.splice(1).reverse();
    },
    outbox() {
      let uid = this.$route.params.uid;
      let fromMess = [];
      this.allMailbox.map(item => {
        console.log(item, item.fromUser, uid, "IFD");
        return item.fromUser == uid ? fromMess.push(item) : "";
      });
      if (!fromMess) return;
      console.log(fromMess, "fromMess");
      return fromMess.reverse();
    },
    inbox() {
      let uid = this.$route.params.uid;
      let toMess = [];
      this.allMailbox.map(item => {
        console.log(item, item.toUser, uid, "IUD");
        return item.toUser == uid ? toMess.push(item) : null;
      });
      if (!toMess) return;
      console.log(toMess, "toMess");
      return toMess.reverse();
    }
  },
  filters: {
    userName: function(value, users) {
      if (!users || !value) return;
      let user = users.find(item => {
        return item.uid == value;
      });
      return user.displayName;
    }
  }
};
</script>

<style lang="scss" scoped>
.dash-mail {
  background-color: #eeeeee;
  min-height: 100vh;
  padding-bottom: 3rem;
}
@keyframes scaleOpen {
  0% {
    opacity: 0.5;
    transform: scale(1, 0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
section.mail-box {
  .header {
    width: 90%;
    position: relative;
    background: white;
    text-align: center;
    margin: 1rem auto;
    border: 1px solid;
    border-radius: 3px;
    cursor: pointer;
    &.active {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
    }
    button {
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
      svg {
        transform: rotate(90deg);
        transition: 0.3s ease-in-out;
        height: 35px;
        width: 35px;
      }
      &.active {
        svg {
          transform: rotate(270deg);
        }
      }
      &:hover {
        background-color: #6683b9;
        svg {
          fill: white;
        }
      }
    }
  }
  .collapse {
    background: white;
    display: none;
    width: 90%;
    text-align: center;
    margin: -17px auto;
    border: 1px solid;
    border-top: 0;
    &.active {
      display: block;
      animation: scaleOpen 0.4s ease-in-out;
      animation-fill-mode: forwards;
      transform-origin: top;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      margin-bottom: 2rem;
    }
    article {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;

      border-top: 1px solid;

      &.title {
        background-color: #6b6161;
        color: white;
      }
      h4 {
        width: 100%;
      }
    }
  }
}
</style>