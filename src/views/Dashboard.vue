<template>
  <main class="dashboard">
    <div class="profile-wrapper">
      <UserProfile />
      <Contacts />
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
import Contacts from "@/components/shared/ContactsSection/Contacts.vue";
export default {
  name: "Dashboard",
  components: {
    SendMessage,
    LatestBlog,
    UserProfile,
    Contacts
  },
  created() {
    //console.log(this.$route.params);
  }
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 3rem;
  background-color: whitesmoke;
  padding-bottom: 2rem;
  padding-top: 1rem;
}
.profile-wrapper {
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
  .profile-wrapper {
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