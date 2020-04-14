<template>
  <div>
    <h1>Blog</h1>
    <!-- {{topArticles}}:TOP -->
    <section class="article-container">
      <article
        @click="handleOpenArticle(art)"
        class="blog"
        v-for="(art,ind) in topArticles"
        :key="ind"
      >
        <h2>Title:{{art.title}}</h2>
        <h2>Summary:{{art.summary}}</h2>
        <h2>Content:{{art.content}}</h2>
      </article>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Blog",
  computed: {
    ...mapState({
      topArticles: state => state.articles.topArticles
      //   b: state => state.b
    }),
    hasArticles() {
      return this.$store.getters["pr/hasArticles"];
    }
    // topArticles() {
    //   return this.$store.getters["articles/topArticles"];
    // }
  },
  data() {
    return {};
  },
  //   watch: {
  //     topArticles() {
  //       console.log("watch update");
  //       return this.$store.state;
  //     }
  //   },
  methods: {
    ...mapActions(["articles/fetchArticles"]), //-> this['articles/fetchArticles']()
    ...mapMutations(["articles/selectedArticle"]),
    handleFetchArticles() {
      if (!this.hasArticles) {
        this["articles/fetchArticles"]().then(() => {
          console.log("upd");
          //   this.update();
        });
      }
    },
    handleOpenArticle(art) {
      this["articles/selectedArticle"](art);
      console.log("pushpage", art);
      this.$router.push(`blog/${art.title}`);
    }
  },
  beforeCreate() {
    console.log("BC");
  },
  created() {
    this.handleFetchArticles();
  }
};
</script>

<style lang="scss" scoped>
section.article-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  article {
    cursor: pointer;
    min-width: 90%;
    margin: 2% 5%;
    box-shadow: 0px 0px 3px 2px #8080808f;
    border-radius: 8px;
  }
}

@media only screen and (min-width: 900px) {
  section.article-container {
    padding: 5%;
    article {
      min-width: 45%;
      margin: 2% 2.5%;
    }
  }
}
</style>