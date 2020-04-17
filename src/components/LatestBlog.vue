<template>
  <div class="latest-news">
    <BlogArticleList />
  </div>
</template>

<script>
import BlogArticleList from "@/components/BlogArticleList.vue";
export default {
  name: "LatestBlog",
  components: {
    BlogArticleList
  }
};
</script>
<style lang="scss">
.latest-news {
  margin-top: 3rem;
}
</style>