<template>
  <div>
    <h1>Add my Expertise</h1>
    <form @submit.prevent="handleFormSubmit">
      <div class="upload-image">
        <!-- <p v-if="!image">Upload an image:</p> -->
        <div v-if="!image" class="upload-btn">
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
      <input placeholder="title" v-model="title" type="text" />

      <select v-model="selectedCategory">
        <option v-for="(opt, ind) in filteredCategories" :key="ind">{{opt}}</option>
        <option>Add a new category</option>
      </select>

      <input
        v-if="selectedCategory == 'Add a new category'"
        placeholder="category"
        v-model="category"
        type="text"
      />
      <input placeholder="price per 5 questions" v-model="price" type="text" />
      <textarea rows="6" placeholder="description" v-model="description" type="text" />
      <button>Sumit</button>
    </form>
    <div class="success-container" v-if="hideForm">
      <h1>Thank you for contributing!</h1>
      <h4>Your article has been shared!</h4>
      <p>Your help build community knowledge</p>
      <button class="reset">Wrtie another Article</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "firebase";
export default {
  name: "AddProduct",
  // in Add product - make mixin
  computed: {
    ...mapState({
      filteredCategories: state => {
        let itemsArr = [];
        state.products.allProducts.map(item => {
          let res = !itemsArr.includes(item.category)
            ? itemsArr.push(item.category)
            : null;
          return res;
        });
        return itemsArr;
      }
      //   b: state => state.b
    })
  },
  data() {
    return {
      title: "",
      category: "",
      description: "",
      price: "",

      imageType: "",
      imageAddress: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      collection: {},
      disableUpload: false,
      selectedCategory: "",
      newCategory: "",
      showUploadBtn: false,
      uploadComplete: false,
      hideForm: false,
      image: ""
    };
  },
  watch: {
    category(newValue) {
      let cat = newValue[0].toUpperCase() + newValue.substring(1);
      console.log("cat", cat);
      return cat;
    }
  },
  methods: {
    ...mapActions(["products/writeNewProduct"]),
    handleFormSubmit() {
      console.log(
        this.title,
        this.price,
        this.category,
        this.description,
        this.picture,
        "TSC"
      );
      let pay = {
        title: this.title,
        category: this.category,
        price: this.price,
        description: this.description,
        imageURL: this.picture || ""
      };
      this["products/writeNewProduct"](pay);
      this.title = "";
      this.price = "";
      this.category = "";
      this.description = "";
      this.picture = "";
    },

    previewImage(event) {
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.showUploadBtn = true;
      this.onFileChange(event);
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
    }
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
  background-color: white;
  margin-bottom: 1rem;

  input:not(.file-upload),
  textarea,
  select,
  button {
    min-height: 2rem;
    height: 2rem;
    margin: 10px;
    border-radius: 30px;
    border-radius: 8px;
    border: 1px solid gray;
    outline: none;
    cursor: pointer;
    font-size: 1rem;
  }
  button {
    height: 2rem;
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
  }

  input,
  textarea {
    padding-left: 10px;
    resize: none;
    height: auto;
  }
  select {
    height: 2.35rem;
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