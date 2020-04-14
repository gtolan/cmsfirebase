<template>
  <div>
    <h1>Add Blog Article</h1>
    <form @submit.prevent="handleFormSubmit">
      <div v-if="imageData!=null">
        <img class="preview" :src="picture" />
        <br />
        <button @click="onUpload">Upload</button>
      </div>
      <div v-if="!image">
        <h2>Select an image</h2>
        <input type="file" @change="onFileChange" />
      </div>
      <div v-else>
        <img :src="image" />
        <button @click="removeImage">Remove image</button>
      </div>
      <input v-model="title" type="text" />
      <input v-model="summary" type="text" />
      <textarea v-model="content" type="text" />
      <button>Sumit</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "AddBlogArticle",
  data() {
    return {
      title: "",
      summary: "",
      content: "",
      image: "",
      imageType: "",
      imageAddress: "",
      imageData: null,
      picture: null,
      uploadValue: 0
    };
  },
  methods: {
    handleFormSubmit() {
      console.log(this.title, this.summary, this.content, "TSC");
    },
    onFileChange(e) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
img.preview {
  width: 200px;
}
</style>