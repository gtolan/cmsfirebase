<template>
  <div>
    <h1>ProductCategory</h1>
    <div class="category-list">
      <div class="category-card" v-for="(category,ind) in filteredCategories" :key="ind">
        <h4>{{category}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProductCategory",
  computed: {
    // In ADd Product - make mixin
    ...mapState({
      filteredCategories: state => {
        let itemsArr = [];
        state.products.allProducts.map(item => {
          console.log(item, "item");
          let res = !itemsArr.includes(item.category)
            ? itemsArr.push(item.category)
            : null;
          console.log(res, "res");
          return res;
        });
        return itemsArr;
      }
      //   b: state => state.b
    })
  }
};
</script>

<style lang="scss" scoped>
</style>