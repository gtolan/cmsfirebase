<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleFormSubmit">
      <input v-model="email" type="text" />
      <input v-model="displayName" type="text" />
      <input v-model="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      displayName: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["authentication/register"]),
    handleFormSubmit() {
      let payload = {
        email: this.email,
        password: this.password,
        displayName: this.displayName,
        online: true,
        messages: [null]
      };
      this["authentication/register"](payload).then(() => {
        console.log("Write succeeded!");
        this.$router.push("/dashboard");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>