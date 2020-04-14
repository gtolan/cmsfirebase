
import firebase from 'firebase';


export default {
  namespaced: true,
  state: {
    articles:null,
    topArticles:null,
    selectedArticle:null,
    writtenArticle:null
  },
  mutations: {
    saveArticles(state, payload){
      console.log("[STORE MUTATIONS] - saveArticles", payload, "payload");
      state.articles = payload;
    },
    writeArticles(state, payload){
        console.log("[STORE MUTATIONS] - writeArticles", payload, "payload");
        state.topArticles = payload;
    },
    selectedArticle(state, art){
        console.log("[STORE MUTATIONS] - selectedArticle", art, "payload");
        state.selectedArticle = art;
    },
    writeToArticle(state, payload){
        console.log("[STORE MUTATIONS] - writeToArticle", payload, "payload");
        state.writtenArticle = payload
    }
  },
  getters:{
    hasArticles(state){
        console.log(state, 'gett')
      return state.articles != null ? true : false
    }
  },
  actions: {
    // async login({ dispatch }, user) {
    //   console.log("[STORE ACTIONS] - login", user, "user");
    //   await firebase.auth().currentUser.getIdToken(true);
    //   const userInfo = {
    //     // name: user.displayName || 'No Name',
    //     email: user.email,
    //     // avatar: user.photoURL,
    //     uid: user.uid
    //   };

    // //   await dispatch("setUSER", userInfo);
    // //   await dispatch("saveUID", userInfo.uid);
    //   console.log("[STORE ACTIONS] - in login, response:", status);
    // },
    async fetchArticles({ commit }){
      console.log("[STORE ACTIONS] - fetchArticles:", );
       await firebase.firestore().collection('articles').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot.docs}`);
        docSnapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
        let articles = []
        docSnapshot.forEach(doc => {
            let data= doc.data();
            return articles.push({...data, id:doc.id});
          });
          console.log('WAR', articles)
        commit("writeArticles", articles);
        commit("saveArticles", docSnapshot);
        //  return docSnapshot
        // ...
        return docSnapshot
      }, err => {
        console.log(`Encountered error: ${err}`);
      })
    },
    async writeNewArticle({commit}, payload){
        console.log("[STORE ACTIONS] - writeNewArticle", payload)
        let addDocRef = firebase.firestore().collection('articles')
        await addDocRef.add(
            payload
          ).then(ref => {
            console.log('Added document with ID: ', ref.id);
            console.log(ref)
          });
          commit('writeToArticle',payload)
    }
  },
}
