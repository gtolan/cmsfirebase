
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

    writeNewMessage({commit}, payload){
      const writeFB = () => {
        console.log("[STORE ACTIONS] - write NEW mess", payload)
        let {toUser, fromUser} = payload;
        console.log(fromUser)
        let addDocRef = firebase.firestore().collection(`users/`).doc(`${toUser}`) //.doc(`${fromUser}`)
        // Atomically add a new region to the "regions" array field.
        let updateArr =  firebase.firestore.FieldValue.arrayUnion(payload)
        addDocRef.update({messages:updateArr})

        let addDocRef2 = firebase.firestore().collection(`users/`).doc(`${fromUser}`) //.doc(`${fromUser}`)
        // Atomically add a new region to the "regions" array field.
        let updateArr2 =  firebase.firestore.FieldValue.arrayUnion(payload)
        addDocRef2.update({messages:updateArr2})
      };

        writeFB();
        commit('writeSentMessages',payload)
        return true;
      }
  
  },
}
