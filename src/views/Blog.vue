<template>
  <main>
    <h1 class="title">News Feed</h1>
    <h4 class="subtitle">Free Advice shared from top rated advisors in their field</h4>
    <BlogArticleList />
  </main>
</template>

<script>
import BlogArticleList from "@/components/BlogArticleList.vue";
export default {
  name: "Blog",
  components: {
    BlogArticleList
  }
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 3rem;
  background-color: whitesmoke;
  background-color: white;
  h1.title {
    margin-top: 4rem;
  }
  h4.subtitle {
    padding: 0rem 2rem 1rem;
  }
}

@media only screen and (min-width: 700px) {
  main {
    h1.title {
      margin-top: 5rem;
    }
  }
}
</style>