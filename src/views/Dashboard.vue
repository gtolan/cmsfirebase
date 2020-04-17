<template>
  <main>
    <div class="profiler-wrapper">
      <!-- <h1>Dashboard</h1> -->
      <UserProfile />
      <!-- <h1>Contacts</h1> -->
      <Contacts />
      <!-- <button @click="handleLogout">Logout</button> -->
      <!-- <div class="contact-controls">
      <button class="filter-a-z" @click="handleAZFilter" :class="{'active':this.sortAZ}">
        Sort A-Z
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path
            d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
          />
        </svg>
      </button>
      <button class="filter-a-z" @click="handleOnlineFilter">
        Online Status
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"
          />
        </svg>
      </button>
      <div class="search-container">
        <input type="text" v-model="searchUser" placeholder="search user..." />
      </div>
    </div>
    <div class="user-container">
      <div class="card" v-for="(user, ind) in usersList" :key="ind">
        <img class="profile-image" :src="user.profileImage" alt="profile image" />
        <p @click.self="handleOpenMailBox(user.id)">{{user.displayName}}</p>
        <p
          class="status"
          :class="{'offline':usersList ? !user.online : ''}"
        >{{user.online | isOnline}}</p>
        <button class="send-message" @click.self="handleSendMessage(user.id)">Send Message</button>
      </div>
      </div>-->
      <LatestBlog />
      <router-link class="add-article" to="/add-blog-article">Add Blog Article</router-link>
    </div>
    <SendMessage />
  </main>
</template>

<script>
import SendMessage from "@/components/SendMessage.vue";
import LatestBlog from "@/components/LatestBlog.vue";
import UserProfile from "@/components/UserProfile.vue";
import Contacts from "@/components/shared/Contacts.vue";
export default {
  name: "Dashboard",
  components: {
    SendMessage,
    LatestBlog,
    UserProfile,
    Contacts
  }
  //   data() {
  //     return {
  //       fromUser: "",
  //       searchUser: "",
  //       sortAZ: false,
  //       toggleOnline: false,
  //       toggleAZ: false,
  //       filterName: ""
  //     };
  //   },
  //   filters: {
  //     isOnline: function(value) {
  //       return value == true ? "Online" : "Offline";
  //     }
  //   },

  //   computed: {
  //     ...mapState({
  //       users: state => state.authentication.users,
  //       uid: state => state.authentication.uid
  //       //   b: state => state.b
  //     }),
  //     usersList() {
  //       if (!this.users) return;
  //       let filter = this.filterName != "" ? this[this.filterName]() : this.users;
  //       console.log(filter, "filter");
  //       return filter;
  //     }
  //   },
  //   methods: {
  //     ...mapActions(["authentication/fetchUsers", "authentication/logout"]),
  //     ...mapMutations([
  //       "messageUsers/writeFromUser",
  //       "components/toggleSendMessage",
  //       "authentication/setUSER"
  //     ]),
  //     handleLogout() {
  //       console.log(this.uid, "logemout");
  //       this["authentication/logout"](this.uid);
  //     },
  //     handleFetchUsers() {
  //       this["authentication/fetchUsers"]();
  //     },
  //     handleSendMessage(uid) {
  //       this.fromUser = uid;
  //       this["messageUsers/writeFromUser"](uid);

  //       this["components/toggleSendMessage"]();
  //     },
  //     handleOpenMailBox(id) {
  //       this.$router.push(`/dashboard/${id}`);
  //     },
  //     filterStatus() {
  //       console.log("filterStatus");
  //       let { online, offline } = this.sortOfflineOnline();
  //       let arr = this.toggleOnline
  //         ? [...online, ...offline]
  //         : [...offline, ...online];
  //       return arr;
  //     },
  //     filterAZ() {
  //       console.log("filterAZ");
  //       let azUsers = this.sortAZUserNames();

  //       return azUsers;
  //     },
  //     sortAZUserNames() {
  //       console.log("start sort", this.users);
  //       let az;
  //       if (this.toggleAZ) {
  //         az = this.users.sort((a, b) => {
  //           console.log("started sorting", a, b);
  //           return b.displayName.localeCompare(a.displayName);
  //         });
  //         console.log(az[0].displayName, az[2].displayName, "AZ");
  //       } else {
  //         az = this.users.sort((a, b) => {
  //           console.log("started sorting2", a, b);
  //           return a.displayName.localeCompare(b.displayName);
  //         });
  //         console.log(az[0].displayName, az[2].displayName, "ZA");
  //       }

  //       return az;
  //     },
  //     sortOfflineOnline() {
  //       let online = [];
  //       let offline = [];
  //       console.log(this.users, "userss");
  //       if (!this.users[0].online) return;
  //       this.users.map(item => {
  //         // console.log(item.online);
  //         return item.online == true ? online.push(item) : offline.push(item);
  //       });
  //       //   console.log(online[0].online, offline[0].online, "after filter");
  //       return { online, offline };
  //     },
  //     handleOnlineFilter() {
  //       this.toggleAZ = false;
  //       this.filterName = "filterStatus";
  //       this.toggleOnline = !this.toggleOnline;
  //     },
  //     handleAZFilter() {
  //       this.toggleOnline = false;
  //       this.filterName = "filterAZ";
  //       this.toggleAZ = !this.toggleAZ;
  //     }
  //   },
  //   created() {
  //     this.handleFetchUsers();
  //   }
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 3rem;
  background-color: whitesmoke;
  padding-bottom: 2rem;
  padding-top: 1rem;
}
.profiler-wrapper {
  width: 95%;
  margin: auto;
  margin-top: 1rem;
  background-color: white;
  padding-top: 0;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
@media only screen and (min-width: 500px) {
  .profiler-wrapper {
    width: 90%;
  }
}

// .add-article {
//   min-width: 200px;
//   text-decoration: none;
//   height: 2rem;
//   display: block;
//   max-width: 300px;
//   margin: auto;
//   background-color: #143e8c;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-content: center;
//   border-radius: 30px;
//   height: 2.5rem;
//   transition: 0.3s ease-in-out;
//   color: white;
//   font-weight: 600;
//   letter-spacing: 1px;
//   cursor: pointer;
//   &:hover {
//     background-color: #1d56bf;
//   }
// }
// .user-container {
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   .card {
//     width: 90%;
//     margin: 3px 5%;
//     border: 1px solid grey;
//     border-radius: 3px;
//     overflow: hidden;
//     cursor: pointer;
//     background-color: white;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     img.profile-image {
//       width: 35px;
//       height: 35px;
//       margin-top: 10px;
//       margin-left: 10px;
//       border-radius: 50%;
//       margin-right: 1rem;
//     }
//     p {
//       padding-left: 10px;
//     }
//     p.status {
//       width: 22%;
//       background-color: green;
//       height: 100%;
//       margin: 0;
//       margin-left: auto;
//       margin-right: 1px;
//       min-height: 54px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       color: white;
//       font-size: 0.97rem;
//       font-weight: 600;
//       letter-spacing: 1px;
//       transition: 0.3s ease-in-out;
//       &.offline {
//         background-color: red;
//         &:hover {
//           background-color: #980d0d;
//         }
//       }
//       &:hover {
//         background-color: #0e630e;
//       }
//     }
//     button {
//       cursor: pointer;
//       border: none;
//       transition: 0.3s ease-in-out;
//       background-color: #143e8c;
//       color: white;
//       font-size: 0.97rem;
//       font-weight: 600;
//       letter-spacing: 1px;
//       padding: 0px 40px;
//       &:hover {
//         background-color: #1d56bf;
//       }
//     }
//   }
// }

// .contact-controls {
//   width: 90%;
//   margin: 2% 5%;
//   border-radius: 3px;
//   overflow: hidden;
//   cursor: pointer;
//   background-color: white;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   height: 3rem;
//   border: 1px solid grey;
//   align-content: center;
//   align-items: center;
//   button,
//   div.search-container {
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     outline: none;
//   }
//   button {
//     font-size: 0.97rem;
//     font-weight: 600;
//     letter-spacing: 1px;
//     padding: 0px;
//     border: 1px solid grey;
//     height: 2.35rem;
//     width: 94%;
//     border-radius: 30px;
//     margin: auto 1%;
//     position: relative;

//     svg {
//       vertical-align: middle;
//       position: absolute;
//       margin-top: -6px;
//       height: 32px;
//       width: 32px;
//       right: 6px;
//       transition: 0.3s ease-in-out;
//       transform: rotate(90deg);
//       border-radius: 50%;
//       transition: 0.3s ease-in-out;
//       &:hover {
//         background-color: #8080803b;
//       }
//     }
//   }
//   div.search-container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     align-content: center;
//     justify-content: center;
//     input {
//       font-size: 0.9rem;
//       border-radius: 30px;
//       border: 1px solid gray;
//       width: 90%;
//       padding-left: 4%;
//       height: 2.05rem;
//       cursor: pointer;
//       outline: none;
//     }
//   }
// }
</style>