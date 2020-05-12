<template>
  <div>
    <ContactControls />
    <ContactList />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ContactList from "./ContactsList";
import ContactControls from "./ContactControls";
export default {
  name: "Contacts",
  components: {
    ContactList,
    ContactControls
  },

  methods: {
    ...mapActions(["authentication/fetchUsers"]),
    handleFetchUsers() {
      this["authentication/fetchUsers"]();
    }
  },
  created() {
    this.handleFetchUsers();
  }
};
</script>

<style lang="scss" scoped>
</style>