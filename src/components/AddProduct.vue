<template>
  <div>
    <h1>Add Product</h1>
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
      <input placeholder="price" v-model="price" type="text" />
      <textarea placeholder="description" v-model="description" type="text" />
      <button>Sumit</button>
    </form>
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
      image: "",
      imageType: "",
      imageAddress: "",
      imageData: null,
      picture: null,
      uploadValue: 0,
      collection: {},
      disableUpload: false,
      showUploadBtn: false,
      selectedCategory: "",
      newCategory: ""
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
  input:not(.file-upload),
  textarea,
  select,
  button {
    min-height: 2rem;
    height: 2rem;
    margin: 10px;
    border-radius: 3px;
    border: 1px solid;
    outline: none;
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
</style>