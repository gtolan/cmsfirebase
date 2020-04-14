<template>
  <article>
    <router-link to="/blog">Back to Blog Home</router-link>|
    <h1>Blog Article</h1>
    <h2>Article{{ this.$route.params.articleName }}</h2>
    <h3>{{selectedArticle.title}}</h3>
    <h3>{{selectedArticle.summary}}</h3>
    <h3>{{selectedArticle.content}}</h3>
  </article>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BlogArticle",
  computed: {
    ...mapState({
      selectedArticle: state => state.articles.selectedArticle
    })
  }
};
</script>

<style lang="scss" scoped>
article {
  cursor: pointer;
  min-width: 90%;
  margin: 2% 5%;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 8px;
}
</style>