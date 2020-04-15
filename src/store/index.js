import Vue from "vue";
import Vuex from "vuex";

import articlesModule from './modules/articles';
import productsModule from './modules/products';
import authenticationModule from './modules/authentication';
import messageUsersModule from './modules/messageUsers';
import componentsModule from './modules/components';

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {
  //   // articles:null
  // },
  // mutations: {
  //   // saveArticles(state, payload){
  //   //   console.log("[STORE MUTATIONS] - saveArticles", payload, "payload");
  //   //   state.articles = payload;
  //   // },
  // },
  // getters:{
  //   hasArticles(){
  //     //return state.articles != null ? true : false
  //     return true;
  //   }
  // },
  // actions: {
  //   async login({ dispatch }, user) {
  //     console.log("[STORE ACTIONS] - login", user, "user");
  //     await const token = firebase.auth().currentUser.getIdToken(true);
  //     const userInfo = {
  //       // name: user.displayName || 'No Name',
  //       email: user.email,
  //       // avatar: user.photoURL,
  //       uid: user.uid
  //     };

//https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex
//https://medium.com/@anas.mammeri/vue-2-firebase-how-to-build-a-vue-app-with-firebase-authentication-system-in-15-minutes-fdce6f289c3c
// sample - https://github.com/bhaidar/notes-writer/blob/add-auth/src/store/index.js

  //localStorage.setItem('token', token) //Add on Auth stage Change...
  //     await dispatch("setUSER", userInfo);
  //     await dispatch("saveUID", userInfo.uid);
  //     console.log("[STORE ACTIONS] - in login, response:", status);
  //   },
    // async fetchArticles({ commit }){
    //   console.log("[STORE ACTIONS] - fetchArticles:", );
    //    await firebase.firestore().collection('articles').onSnapshot(docSnapshot => {
    //     console.log(`Received doc snapshot: ${docSnapshot.docs}`);
    //     docSnapshot.forEach(doc => {
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //      return commit("saveArticles", docSnapshot);
    //     // ...
    //   }, err => {
    //     console.log(`Encountered error: ${err}`);
    //   })
    // }
  // },
  modules: {
    articles:articlesModule,
    products:productsModule,
    authentication:authenticationModule,
    messageUsers:messageUsersModule,
    components:componentsModule
  }
});
