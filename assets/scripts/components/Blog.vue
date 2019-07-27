<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 col-md-6">
        <BlogPost :post="post" :formatDate="formatDate" />
      </div>
      <div class="col-12 col-md-6">
        <BlogList :posts="posts" :formatDate="formatDate" :showPost="showPost" />
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "./BlogPost.vue";
import BlogList from "./BlogList.vue";

const api = "http://localhost:8000/wp-json/wp/v2/posts/";

export default {
  name: "Blog",
  data() {
    return {
      posts: [],
      post: false,
      post_id: 0
    };
  },
  beforeMount() {
    this.getPosts();
  },
  methods: {
    getPosts() {
      this.axios
        .get(api + "?_embed")
        .then(response => {
          this.posts = response.data;
          this.post_id = this.posts[0].id;
          this.getPost();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPost() {
      this.axios
        .get(api + this.post_id)
        .then(response => {
          this.post = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    showPost(arg, event) {
      event.preventDefault;
      this.post_id = arg;
      this.getPost();
    },
    formatDate(arg) {
      var d = new Date(arg);
      return d
        .toLocaleDateString("en-US")
        .split("/")
        .join(".");
    }
  },
  components: {
    BlogList,
    BlogPost
  }
};
</script>

<style scoped lang="scss">
</style>