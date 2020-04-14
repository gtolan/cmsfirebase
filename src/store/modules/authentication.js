import firebase from 'firebase';


export default {
  namespaced: true,
  state: {
    uid:null,
    user:null,
    token: localStorage.getItem('token') || null,
    users:[{uid:'',
            displayName:'',
            email:'',
            online:false,
            messages:[{toUser:'',fromUser:'',message:'',time:''}]
        }]
  },
  mutations: {
    saveUID(state, uid) {
        console.log("[STORE MUTATIONS] - saveUID:", uid);
        state.uid = uid;
      },
      setUSER(state, user) {
        console.log("[STORE MUTATIONS] - setUSER:", user);
        state.user = user;
      },
      setTOKEN(state, token) {
        console.log("[STORE MUTATIONS] - setTOKEN:", token);
        state.token = token;
      },
      writeUsersList(state, users){
        console.log("[STORE MUTATIONS] - writeUsersList:", users);
        state.users = users;
      },

  },
    getters:{

      },
      actions: {
        async login({ dispatch }, user) {
            console.log("[STORE ACTIONS] - login", user, "user");
            const token = await firebase.auth().currentUser.getIdToken(true);
            const userInfo = {
              name: user.displayName || 'No Name',
              email: user.email,
              // avatar: user.photoURL,
              uid: user.uid
            };
            localStorage.setItem('token', token)
            await dispatch("setTOKEN", token);
            await dispatch("setUSER", userInfo);
            await dispatch("saveUID", userInfo.uid);
            console.log("[STORE ACTIONS] - in login, response:", status);
          },

    async register({dispatch}, payload) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then(
            firebaseUser => {
     
              dispatch("login", firebaseUser.user);
                console.log(firebaseUser.user, firebaseUser)
              return firebaseUser;
            },
            err => {
              // this.errorMsg = err.message;
              alert("Oops. " + err.message);
            }
          )
          .then(userOb => {
            console.log(userOb, "USER");
          
            let addDocRef = firebase.firestore().collection('users');
            const{ email, uid} = userOb.user;
            const {displayName, online, messages} = payload;
            const newUser = {email,uid,displayName,online, messages}
              //return addDocRef.add(
                return addDocRef.doc(`${uid}`).set(
                newUser).then(ref => {
                console.log('Added document with ID: ', ref.id);
                console.log(ref)
                // commit('writeToProduct',payload)
              });
              
              
              
      })
    },
    async fetchUsers({ commit }){
        console.log("[STORE ACTIONS] - fetchUsers:", );
         await firebase.firestore().collection('users').onSnapshot(docSnapshot => {
          console.log(`Received doc snapshot: ${docSnapshot.docs}`);
          docSnapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
          let users = []
          docSnapshot.forEach(doc => {
              let data= doc.data();
              return users.push({...data, id:doc.id});
            });
            console.log('WAA', users)
          commit("writeUsersList", users);
        //   commit("saveUsersList", docSnapshot);
          //  return docSnapshot
          // ...
          return docSnapshot
        }, err => {
          console.log(`Encountered error: ${err}`);
        })
      },
}
}