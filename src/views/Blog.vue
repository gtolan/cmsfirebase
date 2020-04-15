<template>
  <main>
    <h1>Blog</h1>
    <!-- {{topArticles}}:TOP -->
    <section class="article-container">
      <article
        @click="handleOpenArticle(art)"
        class="blog"
        v-for="(art,ind) in topArticles"
        :key="ind"
      >
        <div class="container one">
          <h2 class="title">{{art.title}}</h2>
          <h2 class="summary">{{art.summary}}</h2>
          <p class="author">By {{art.authorName}}</p>
          <!-- <h2 class="content" v-html="art.content"></h2> -->
          <button class="read-more" @click="handleReadAritlce(art)">Read More</button>
        </div>
        <div class="container two">
          <div class="date-chip">{{art.date}}</div>
          <img :src="art.imageURL" class="article-image" />
        </div>
      </article>
    </section>
  </main>
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
main {
  margin-top: 3rem;
}
section.article-container {
  display: flex;
  justify-content: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  article {
    cursor: pointer;
    min-width: 90%;
    max-width: 350px;
    margin: 2% 5%;
    box-shadow: 0px 0px 3px 2px #8080808f;
    border-radius: 8px;
    display: flex;
    flex-direction: column-reverse;
    overflow: hidden;

    .container {
      height: 100%;
      &.two {
        position: relative;
        img {
          width: 100%;
          min-height: 100%;
          max-height: 250px;
          object-fit: cover;
        }
        .date-chip {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          padding: 2px 10px;
          background-color: white;
          border-radius: 20px;
        }
      }
      &.one {
        height: 100%;
        display: flex;
        flex-direction: column;
        h2 {
          text-align: left;
          padding: 0.5rem;
          margin: 0;
          p {
            margin: 0;
          }
        }
        p.author {
          margin: 0;
          text-align: left;
          padding: 0.51rem;
          margin-top: -11px;
        }
        h2.title {
          font-size: 1.3rem;
        }
        h2.summary {
          font-size: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding-bottom: 0;
          margin-bottom: 10px;
        }
        h2.content {
          margin: 5px auto;
          font-size: 0.9rem;
          line-height: 1.3rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding-bottom: 0;

          p {
            margin: 0px auto;
          }
        }
        button.read-more {
          width: calc(100% - 1rem);
          height: 2.5rem;
          margin: 0.5rem;
          margin-top: auto;
          text-transform: uppercase;
          font-size: 1rem;
          background-color: #143e8c;
          transition: 0.3s ease-in-out;
          color: white;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          border-radius: 3px;
          &:hover {
            background-color: #1d56bf;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 500px) {
  section.article-container {
    // padding: 5%;
    article {
      min-width: 0;
      max-width: 400px;
      margin: 2% auto;
      box-shadow: 0px 0px 3px 2px #8080808f;
    }
  }
}

@media only screen and (min-width: 700px) {
  section.article-container {
    padding: 5%;
    padding: 1% 5% 3%;
    article {
      min-width: 0;
      margin: 2% 2.5%;
      width: calc((100vw - 10vw - 10.1%) / 2);
    }
  }
}
</style>