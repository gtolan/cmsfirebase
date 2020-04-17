<template>
  <div class="categories-container">
    <h1>Expert Categories</h1>
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
div.categories-container {
  padding: 0;
  margin: 0% calc(5% - 2px) 3% calc(5% - 0px);
  background: white;
  border: 1px solid #80808040;
  border-radius: 3px;
  margin-top: 2rem;
}
.category-list {
  padding: 0;
  margin: 2% 2.5%;
  background: white;
  border: 1px solid #80808040;
  border-radius: 3px;
  padding-bottom: 1rem;
  .category-card {
    height: 3rem;
    border-top: 1px solid #80808040;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-bottom: 1px solid #80808040;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: whitesmoke;
    }
    h4 {
      margin: 0;
      font-size: 1rem;
    }
  }
}
</style>