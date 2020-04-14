
import firebase from 'firebase';


export default {
  namespaced: true,
  state: {
    message:'',
    fromUser:'',
    toUser:'',
    time:'',
    
    sentMessages:[]
  },
  mutations: {

    writeMessage(state, payload){
        console.log("[STORE MUTATIONS] - writeMessage", payload, "payload");
        state.message = payload;
    },
    writeFromUser(state, payload){
        console.log("[STORE MUTATIONS] - writeFromUser", payload, "payload");
        state.fromUser = payload;
    },
    writeToUser(state, payload){
        console.log("[STORE MUTATIONS] - writeToUser", payload, "payload");
        state.toUser = payload;
    },
    writeTime(state, payload){
        console.log("[STORE MUTATIONS] - writeTime", payload, "payload");
        state.time = payload;
    },
    writeSentMessages(state, payload){
        console.log("[STORE MUTATIONS] - writeTime", payload, "payload");
        state.sentMessages.push(payload)
    }
  },
  getters:{
    // hasProducts(state){
    //     console.log(state, 'gett')
    //   return state.allProducts != null ? true : false
    // }
  },
  actions: {

    // async fetchProducts({ commit }){
    //   console.log("[STORE ACTIONS] - fetchProducts:", );
    //    await firebase.firestore().collection('products').onSnapshot(docSnapshot => {
    //     console.log(`Received doc snapshot: ${docSnapshot.docs}`);
    //     docSnapshot.forEach(doc => {
    //       console.log(doc.id, '=>', doc.data());
    //     });
    //     let products = []
    //     docSnapshot.forEach(doc => {
    //         let data = doc.data();
    //         return products.push({...data,id:doc.id});
    //       });
    //       console.log('WAP', products)
    //     commit("writeProducts", products);

    //     return docSnapshot
    //   }, err => {
    //     console.log(`Encountered error: ${err}`);
    //   })
    // },
    async writeNewMessage({commit}, payload){
        console.log("[STORE ACTIONS] - writeNewProduct", payload)
        let {toUser, fromUser} = payload;
console.log(fromUser)
let addDocRef = firebase.firestore().collection(`users/`).doc(`${toUser}`) //.doc(`${fromUser}`)
// Atomically add a new region to the "regions" array field.
let updateArr =  firebase.firestore.FieldValue.arrayUnion(payload)
addDocRef.update({messages:updateArr
  
}).then(ref => {
    console.log('Added document with ID: ', ref);
    console.log(ref)
  });

  let addDocRef2 = firebase.firestore().collection(`users/`).doc(`${fromUser}`) //.doc(`${fromUser}`)
  // Atomically add a new region to the "regions" array field.
  let updateArr2 =  firebase.firestore.FieldValue.arrayUnion(payload)
  addDocRef2.update({messages:updateArr2
    
  }).then(ref => {
      console.log('Added document with ID: ', ref);
      console.log(ref)
    });


          commit('writeSentMessages',payload)
    }
  },
}
