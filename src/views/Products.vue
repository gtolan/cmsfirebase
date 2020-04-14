<template>
  <div>
    <h1>Products</h1>
    <router-view />
    <div class="product-list">
      <div class="product-card" v-for="(prod,ind) in products" :key="ind">
        <img class="prod-image" :src="prod.imageURL" />
        <h4>Name: {{prod.title}}</h4>
        <h4>Category: {{prod.category}}</h4>
        <h4>Description: {{prod.description}}</h4>
        <h4>Price: {{prod.price | currencyFilter}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Products",
  computed: {
    ...mapState({
      products: state => state.products.allProducts
    }),
    hasProducts() {
      console.log(this.products, "prod");
      return this.products.length == 0 ? false : true;
    }
  },
  filters: {
    currencyFilter: function(value) {
      if (!value) return "";
      return `€${value}`;
    }
  },
  methods: {
    ...mapActions(["products/fetchProducts"]), //-> this['articles/fetchArticles']()
    ...mapMutations(["products/selectedProduct"]),
    handleFetchProducts() {
      if (!this.hasProducts) {
        this["products/fetchProducts"]();
        console.log("product-fetch");
      }
    }
  },
  created() {
    this.handleFetchProducts();
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .product-card {
    min-width: 90%;
    max-width: 90%;
    margin: 2% 5%;
    box-shadow: 0px 0px 3px 2px #8080808f;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: left;
    img.prod-image {
      width: 100%;
      position: relative;
      max-height: 200px;
      object-fit: cover;
      object-position: center;
    }
    h4 {
      padding-left: 1rem;
      margin: 8px 0px;
    }
  }
}

@media only screen and (min-width: 500px) {
  .product-list {
    padding: 5%;
    .product-card {
      max-width: 45%;
      min-width: 45%;
      margin: 2% 2.5%;
    }
  }
}
</style>