<template>
  <div v-if="posts">
    <article
      :class="'posts post-'+ post.id"
      v-for="(post, index) in posts"
      :id="index"
      :key="post.id"
    >
      <header>
        <img
          v-lazy="post._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url"
        />
        <h2 class="entry-title">
          <a @click="showPost(post.id, $event)" :tabindex="index">{{post.title.rendered}}</a>
        </h2>
        <time class="updated" :datetime="post.date_gmt">{{formatDate(post.date)}}</time>
      </header>
      <div class="entry-summary" v-html="post.content.rendered"></div>
    </article>
  </div>
</template>

<script>
export default {
  name: "BlogList",
  props: ["posts", "formatDate", "showPost"]
};
</script>

<style scoped lang="scss">
@import "../../styles/common/_variables.scss";
article.posts {
  a {
    color: $gray;
  }
}
</style>