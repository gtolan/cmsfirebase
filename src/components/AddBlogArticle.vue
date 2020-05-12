<template>
  <main>
    <h1 class="title">Share some Advice</h1>
    <form @submit.prevent="handleFormSubmit" v-if="!hideForm">
      <div class="upload-image">
        <div class="use-image-url" :class="{'active':useURL}">
          <button @click.self="toggleUseURL">URL</button>
          <input type="text" v-model="imageURLText" />
        </div>
        <!-- <p v-if="!image">Upload an image:</p> -->
        <div v-if="!image" class="upload-btn" :class="{'active':!useURL}">
          Choose an Image
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02z"
            />
          </svg>
          <input class="file-upload" type="file" @change="previewImage" />
        </div>
        <img class="sample-upload" :src="image" />
      </div>

      <!-- TODO: Or show a link text field -->
      <div v-if="showUploadBtn && uploadComplete == false">
        <p>
          Progress: {{uploadValue.toFixed()+"%"}}
          <progress
            id="progress"
            :value="uploadValue"
            max="100"
          ></progress>
        </p>
      </div>
      <div v-if="imageData!=null && uploadComplete == false">
        <button @click="onUpload" :disabled="disableUpload">Upload</button>
      </div>
      <h4 v-if="uploadComplete == true" class="complete">Upload Complete!</h4>
      <input name="date" type="date" placeholder="01-03-2020" v-model="date" />
      <input name="title" placeholder="title" v-model="title" type="text" />
      <input name="summary" placeholder="summary" v-model="summary" type="text" />
      <textarea rows="6" placeholder="content" v-model="content" type="text" />
      <button type="submit">
        Submit
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
          />
        </svg>
      </button>
    </form>
    <div class="success-container" v-if="hideForm">
      <h1>Thank you for contributing!</h1>
      <h4>Your article has been shared!</h4>
      <p>Your help build community knowledge</p>
      <button class="reset">Write another Article</button>
    </div>

    <section class="article-container">
      <BlogArticleList />
    </section>
  </main>
</template>

<script>
import firebase from "firebase";
import BlogArticleList from "@/components/BlogArticleList.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "AddBlogArticle",
  components: {
    BlogArticleList
  },
  data() {
    return {
      title: "",
      summary: "",
      content: "",
      date: "",
      imageURLText: "",
      useURL: false,
      imageType: "",
      imageAddress: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      collection: {},
      disableUpload: false,
      showUploadBtn: false,
      uploadComplete: false,
      hideForm: false,
      image: ""
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
    toggleUseURL() {
      this.useURL = !this.useURL;
    },
    handleFormSubmit() {
      console.log(this.title, this.summary, this.content, "TSC");
      if (((this.title && this.summary) || this.content) == "") return;

      let chosenImage = this.image == "" ? this.imageURLText : this.image;
      console.log(chosenImage, "chosenImage", this.userName, "this.userName");
      let pay = {
        title: this.title,
        summary: this.summary,
        date: this.date,
        content: this.content,
        imageURL: chosenImage,
        author: "Gerard" //this.profile.displayName ||
      };
      console.log(pay, "PAY");
      this["articles/writeNewArticle"](pay).then(() => {
        console.log("success message and reset form");
        this.hideForm = true;
      });
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.showUploadBtn = true;
      this.onFileChange(event);
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
            this.uploadComplete = true;
          });
        }
      );
    },
    onFileChange(e) {
      console.log("create image");
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      //var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.image = "";
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
      collection2: state => state.articles.topArticles,
      uid: state => state.authentication.uid
      //   b: state => state.b
    }),
    profile() {
      if (!this.users) return;
      let profile = this.users.find(user => user.uid == this.uid);
      if (!profile) return;
      console.log(profile, "profi");
      return profile;
    },

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
  width: 95%;
  margin: auto;
  max-width: 500px;
  box-shadow: 0px 0px 3px 2px #8080808f;
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: white;
  input:not(.file-upload),
  textarea,
  button {
    min-height: 2rem;
    margin: 10px;
    border-radius: 30px;
    border-radius: 8px;
    border: 1px solid gray;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
  }
  button {
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
    border-radius: 30px;
    &:hover {
      background-color: #235cc5;
    }
    svg {
      position: absolute;
      fill: white;
      margin-left: 15px;
      margin-top: -2px;
    }
  }

  input,
  textarea {
    padding-left: 10px;
    resize: none;
  }
}
.use-image-url button {
  width: 3rem;
}
.use-image-url input {
  display: none;
}
.use-image-url.active {
  display: flex;
  justify-content: center;
  input {
    display: block;
  }
  button {
    width: auto;
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

@media only screen and (min-width: 500px) {
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
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
.file-upload {
  // visibility: hidden;
}
main {
  margin-top: -1rem;
  background-color: whitesmoke;
  padding-top: 1rem;
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
.upload-image {
  width: 100%;
  min-height: 200px;
  max-height: 275px;
  -o-object-fit: cover;
  object-fit: cover;
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  position: relative;
  overflow: hidden;
  img.sample-upload {
    width: 100%;
    position: absolute;
  }
  div.upload-btn {
    width: 300px;
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
    position: relative;
    height: 2.5rem;
    margin: 0.5rem auto;
    // margin-top: auto;
    text-transform: uppercase;
    font-size: 1rem;
    background-color: #143e8c;
    transition: 0.3s ease-in-out;
    color: white;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    svg {
      position: absolute;
      right: 15px;
      fill: white;
    }
    input {
      height: 100%;
      padding-left: 0;
      resize: none;
      color: transparent;
      opacity: 0;
      cursor: pointer;
      position: absolute;
      left: 0;
      width: 100%;
    }
  }
}

div.success-container {
  width: 90%;
  max-width: 600px;
  margin: auto;
  background-color: white;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #80808040;
  margin-bottom: 3rem;

  h1 {
    color: green;
  }
  button {
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
    border-radius: 30px;
    max-width: 400px;
  }
}
</style>