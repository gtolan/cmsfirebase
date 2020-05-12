import firebase from 'firebase';


export default {
  namespaced: true,
  state: {
    uid:null,
    user:null,
    usersList:null,
    loginNavbar:false,
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
        state.usersList = users; //For sorting
      },
      toggleLoginNavbar(state){
        console.log("[STORE MUTATIONS] - toggleLoginNavbar:");
        state.loginNavbar = !state.loginNavbar
      },
      updateUserList(state, payload){
        console.log("[STORE MUTATIONS] - filterUserList:");
        state.usersList = payload;
      }

  },
    getters:{

      },
      actions: {

        async signInWithEmailAndPassword({ dispatch }, user) {
        await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(firebaseUser => {
          console.log(firebaseUser.user, "FBU", firebaseUser.user.uid, "UID");
          return dispatch("login",firebaseUser.user);
        //  return this.login(firebaseUser.user);
        })
        // .then(() => {
        //   this.$router.push("/game-dashboard");
        // })
        // .catch(error => {
        //   this.errorMsg = error.message;
        //   console.log(error.message);
        // });
    },
        async login({ commit }, user) {
            console.log("[STORE ACTIONS] - login", user, "user");
           const userInfo = {
              email: user.email,
              uid: user.uid
            };

           
            commit("setUSER", userInfo);
            commit("saveUID", userInfo.uid);
            const token = await firebase.auth().currentUser.getIdToken(true);
            localStorage.setItem('token', token)
            commit("setTOKEN", token);
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
    async logout({ commit }, uid) {
        console.log("[STORE ACTIONS] - logout", uid, "uid");
        await firebase.auth().signOut();
        //Cookies.remove('access_token');
    
        let updDocRef = firebase.firestore().collection(`users/`).doc(`${uid}`) 
        updDocRef.update({online: false});
        localStorage.removeItem('token')
        commit("setUSER", null);
        commit("saveUID", null);
      },
    async fetchUsers({ commit,state }){
        console.log("[STORE ACTIONS] - fetchUsers:", );
        console.log('start fetch', this.users, "users", state)
        if(state.users[0].uid != "")return;
        console.log('continue fetch')
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