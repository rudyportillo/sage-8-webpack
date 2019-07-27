<template>
  <div v-if="post">
    <article :class="'post post-'+ post.id">
      <header>
        <h1 class="entry-title">{{post.title.rendered}}</h1>
        <time class="updated" :datetime="post.date_gmt">{{formatDate(post.date)}}</time>
      </header>
      <div class="entry-summary" v-html="post.content.rendered"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  props: ["post", "formatDate"]
};
</script>

<style scoped lang="scss">
@import "../../styles/common/_variables.scss";
article.post {
  a {
    color: $gray;
  }
}
</style>