

export default {
  namespaced: true,
  state: {
    sendMessageModal:false,
    sideNavOpen:false,
    profileMenuOpen:false,
    blogMenuOpen:false,
  },
  mutations: {

    toggleSendMessage(state){
        console.log("[STORE MUTATIONS] - toggleSendMessageModal",);
        state.sendMessageModal = !state.sendMessageModal;
    },
    toggleSideNavOpen(state) {
        // if(state.profileMenuOpen){ state.sideNavOpen = false}
        state.sideNavOpen = !state.sideNavOpen;
        console.log("sidenav toggled");
    },
    toggleProfileMenu(state){
        console.log("[STORE MUTATIONS] - toggleProfileMenu",);
        if(state.blogMenuOpen == true){ state.blogMenuOpen = false}
        state.profileMenuOpen = !state.profileMenuOpen;
    },
    toggleBlogMenuOpen(state){
        console.log("[STORE MUTATIONS] - toggleBlogMenuOpen",state.profileMenuOpen );
        if(state.profileMenuOpen == true){ state.profileMenuOpen = false}
        state.blogMenuOpen = !state.blogMenuOpen;
    },
   

  },
  getters:{
    sideNavOpen(state) {
        return state.sideNavOpen;
      },

  },
  actions: {


  }
}
