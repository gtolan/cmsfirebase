<template>
  <div class="contact-controls">
    <button class="filter-a-z" @click="handleAZFilter" :class="{'active':this.sortAZ}">
      <span class="md-screen">
        A-Z
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
          />
        </svg>
      </span>
      <span class="sm-screen">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="M12.93 2.65c-.2-.2-.51-.2-.71 0l-2.01 2.01h4.72l-2-2.01zm-.7 18.7c.2.2.51.2.71 0l1.98-1.98h-4.66l1.97 1.98zm-1.25-3.62c.6 0 1.01-.6.79-1.16L8.04 7.03c-.18-.46-.63-.76-1.12-.76-.49 0-.94.3-1.12.76l-3.74 9.53c-.22.56.19 1.16.79 1.16.35 0 .67-.22.8-.55l.71-1.9h5.11l.71 1.9c.13.34.45.56.8.56zm-6.01-4.09l1.94-5.18 1.94 5.18H4.97zm16.08 2.5h-5.33l5.72-8.29c.46-.66-.02-1.57-.82-1.57h-6.48c-.44 0-.79.36-.79.8v.01c0 .44.36.8.79.8h5.09l-5.73 8.28c-.46.66.02 1.57.82 1.57h6.72c.44 0 .79-.36.79-.79.02-.45-.34-.81-.78-.81z"
          />
        </svg>
      </span>
    </button>
    <button class="filter-a-z" @click="handleOnlineFilter">
      <span class="md-screen">
        Status
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
          />
        </svg>
      </span>
      <span class="sm-screen">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
          <path
            d="M2.06 10.06c.51.51 1.32.56 1.87.1 4.67-3.84 11.45-3.84 16.13-.01.56.46 1.38.42 1.89-.09.59-.59.55-1.57-.1-2.1-5.71-4.67-13.97-4.67-19.69 0-.65.52-.7 1.5-.1 2.1zm7.76 7.76l1.47 1.47c.39.39 1.02.39 1.41 0l1.47-1.47c.47-.47.37-1.28-.23-1.59-1.22-.63-2.68-.63-3.91 0-.57.31-.68 1.12-.21 1.59zm-3.73-3.73c.49.49 1.26.54 1.83.13 2.44-1.73 5.72-1.73 8.16 0 .57.4 1.34.36 1.83-.13l.01-.01c.6-.6.56-1.62-.13-2.11-3.44-2.49-8.13-2.49-11.58 0-.69.5-.73 1.51-.12 2.12z"
          />
        </svg>
      </span>
    </button>
    <div class="search-container">
      <input type="text" v-model="searchUser" placeholder="search user..." />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "ContactsControls",
  data() {
    return {
      toggleOnline: false, //Controls
      toggleAZ: false, //Controls
      filterName: "" //Controls
    };
  },
  computed: {
    ...mapState({
      users: state => state.authentication.users,
      usersList: state => state.authentication.usersList,
      uid: state => state.authentication.uid
      //   b: state => state.b
    })
  },
  methods: {
    ...mapMutations(["authentication/updateUserList"]),
    sortOfflineOnline() {
      let online = [];
      let offline = [];
      console.log(this.users, "userss");
      if (!this.users[0].online) return;
      this.users.map(item => {
        // console.log(item.online);
        return item.online == true ? online.push(item) : offline.push(item);
      });
      //   console.log(online[0].online, offline[0].online, "after filter");
      return { online, offline };
    },
    filterStatus() {
      console.log("filterStatus");
      let { online, offline } = this.sortOfflineOnline();
      let arr = this.toggleOnline
        ? [...online, ...offline]
        : [...offline, ...online];
      this["authentication/updateUserList"](arr);
      return;
    },

    handleOnlineFilter() {
      this.toggleAZ = false;
      //      this.filterName = "filterStatus";
      this.filterStatus();
      this.toggleOnline = !this.toggleOnline;
    },
    //AZAZAZAZA
    filterAZ() {
      console.log("filterAZ");
      let azUsers = this.sortAZUserNames();
      this["authentication/updateUserList"](azUsers);
      return; // azUsers;
    },
    sortAZUserNames() {
      console.log("start sort", this.users);
      let az;
      if (this.toggleAZ) {
        az = this.users.sort((a, b) => {
          console.log("started sorting", a, b);
          return b.displayName.localeCompare(a.displayName);
        });
        console.log(az[0].displayName, az[2].displayName, "AZ");
      } else {
        az = this.users.sort((a, b) => {
          console.log("started sorting2", a, b);
          return a.displayName.localeCompare(b.displayName);
        });
        console.log(az[0].displayName, az[2].displayName, "ZA");
      }

      return az;
    },

    handleAZFilter() {
      this.toggleOnline = false;
      this.toggleAZ = !this.toggleAZ;
      this.filterAZ();
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-controls {
  width: 95%;
  margin: 2% 2.5%;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 3rem;

  border: 1px solid #80808040;
  align-content: center;
  align-items: center;
  button,
  div.search-container {
    width: 100%;
    border: none;
    cursor: pointer;
    outline: none;
  }
  button {
    font-size: 0.97rem;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0px;
    border: 1px solid grey;
    height: 2.35rem;
    width: 94%;
    border-radius: 30px;
    margin: auto 1%;
    position: relative;
    .md-screen {
      svg {
        vertical-align: middle;
        position: absolute;
        margin-top: -6px;
        height: 32px;
        width: 32px;
        right: 6px;
        transition: 0.3s ease-in-out;
        transform: rotate(90deg);
        border-radius: 50%;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #8080803b;
        }
      }
    }
  }
  div.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    input {
      font-size: 0.9rem;
      border-radius: 30px;
      border: 1px solid gray;
      width: 90%;
      padding-left: 4%;
      height: 2.05rem;
      cursor: pointer;
      outline: none;
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