// import Blog from "../views/Blog.vue";
export default  [{
    path: "/profile/:uid",
    name: "Profile",
    params:'uid',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/UserProfile.vue")
  },
  {
    path: "/edit-profile/:uid",
    name: "EditProfile",
    params:'uid',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/EditProfile.vue")
  }
]