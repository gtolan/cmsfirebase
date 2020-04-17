// import Blog from "../views/Blog.vue";
// let articleDec = (route) =>{
//     decodeURIComponent(route);
// }



export default  [{
    path: "/blog/",
    name: "Blog",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Blog.vue")
  },{
    path: `/blog/:articleName`,
    name: "BlogArticle",
    params:'articleName',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/BlogArticle.vue")
  },
  {
    path: "/add-blog-article",
    name: "AddBlogArticle",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/AddBlogArticle.vue")
  }
]