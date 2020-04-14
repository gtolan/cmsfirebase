
import firebase from 'firebase';


export default {
  namespaced: true,
  state: {
    allProducts:[],
    selectedProduct:null,
    writtenProduct:null
  },
  mutations: {

    writeProducts(state, payload){
        console.log("[STORE MUTATIONS] - writeProducts", payload, "payload");
        state.allProducts = payload;
    },
    selectedArticle(state, prod){
        console.log("[STORE MUTATIONS] - selectedArticle", prod, "payload");
        state.selectedProduct = prod;
    },
    writeToProduct(state, payload){
        console.log("[STORE MUTATIONS] - writeToProduct", payload, "payload");
        state.writtenProduct= payload
    }
  },
  getters:{
    hasProducts(state){
        console.log(state, 'gett')
      return state.allProducts != null ? true : false
    }
  },
  actions: {

    async fetchProducts({ commit }){
      console.log("[STORE ACTIONS] - fetchProducts:", );
       await firebase.firestore().collection('products').onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot.docs}`);
        docSnapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
        let products = []
        docSnapshot.forEach(doc => {
            let data = doc.data();
            return products.push({...data,id:doc.id});
          });
          console.log('WAP', products)
        commit("writeProducts", products);

        return docSnapshot
      }, err => {
        console.log(`Encountered error: ${err}`);
      })
    },
    async writeNewProduct({commit}, payload){
        console.log("[STORE ACTIONS] - writeNewProduct", payload)
        let addDocRef = firebase.firestore().collection('products')
        await addDocRef.add(
            payload
          ).then(ref => {
            console.log('Added document with ID: ', ref.id);
            console.log(ref)
          });
          commit('writeToProduct',payload)
    }
  },
}
