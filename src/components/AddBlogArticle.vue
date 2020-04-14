<template>
  <div>
    <h1>Add Blog Article</h1>
    <form @submit.prevent="handleFormSubmit">
      <div>
        <p>Upload an image to Firebase:</p>
        <input class="file-upload" type="file" @change="previewImage" />
      </div>
      <div v-if="showUploadBtn">
        <p>
          Progress: {{uploadValue.toFixed()+"%"}}
          <progress
            id="progress"
            :value="uploadValue"
            max="100"
          ></progress>
        </p>
      </div>
      <div v-if="imageData!=null">
        <img class="preview" :src="picture" />
        <br />
        <button @click="onUpload" :disabled="disableUpload">Upload</button>
      </div>
      <input placeholder="date" v-model="date" type="text" />
      <input placeholder="title" v-model="title" type="text" />
      <input placeholder="summary" v-model="summary" type="text" />
      <textarea placeholder="content" v-model="content" type="text" />
      <button>Sumit</button>
    </form>
    <section class="article-container">
      <article class="blog" v-for="(art,ind) in collection2" :key="ind">
        <h2>Title:{{art.title}}</h2>
        <h2>Summary:{{art.summary}}</h2>
        <h2>Content:{{art.content}}</h2>
      </article>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapState } from "vuex";
export default {
  name: "AddBlogArticle",
  data() {
    return {
      title: "",
      summary: "",
      content: "",
      date: "",
      image: "",
      imageType: "",
      imageAddress: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      collection: {},
      disableUpload: false,
      showUploadBtn: false
    };
  },
  //   watch: {
  //     // collection: function() {
  //     //   return this.fetchArticlesInit();
  //     // }
  //   },
  methods: {
    ...mapActions(["articles/fetchArticles", "articles/writeNewArticle"]),
    handleFetchArticles() {
      if (!this.hasArticles) {
        this["articles/fetchArticles"]();
      }
    },
    handleFormSubmit() {
      console.log(this.title, this.summary, this.content, "TSC");
      let pay = {
        title: this.title,
        summary: this.summary,
        date: this.date,
        content: this.content
      };
      this["articles/writeNewArticle"](pay);
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.showUploadBtn = true;
    },

    onUpload() {
      this.picture = null;
      this.disableUpload = true;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.picture = url;
            console.log(url, "firebase upload url");
          });
        }
      );
    },
    async fetchArticlesInit() {
      console.log("[in coponentsABA] - fetchArticles:");
      await firebase
        .firestore()
        .collection("articles")
        .onSnapshot(
          docSnapshot => {
            console.log(`Received doc snapshot: ${docSnapshot.docs}`);
            docSnapshot.forEach(doc => {
              console.log(doc.id, "=>", doc.data());
            });
            let articles = [];
            docSnapshot.forEach(doc => {
              return articles.push(doc.data());
            });
            console.log("WAR", articles);

            //  return docSnapshot
            // ...
            return (this.collection = articles);
          },
          err => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  },
  mounted() {
    // this.fetchArticlesInit();
  },
  computed: {
    ...mapState({
      collection2: state => state.articles.topArticles
      //   b: state => state.b
    }),
    hasArticles() {
      return this.$store.getters["articles/hasArticles"];
    }
  },
  created() {
    this.handleFetchArticles();
  }
};
</script>

<style lang="scss" scoped>
img.preview {
  width: 200px;
}
form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  max-width: 500px;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 8px;
  input:not(.file-upload),
  textarea,
  button {
    min-height: 2rem;
    margin: 10px;
    border-radius: 3px;
    border: 1px solid;
  }
  button {
    height: 2rem;
  }

  input,
  textarea {
    padding-left: 10px;
    resize: none;
  }
}

// ARTICLES
// ARTICLES
// ARTICLES
section.article-container {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  article {
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