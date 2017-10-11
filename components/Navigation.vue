<template>
  <div class="Navigation">
    <h1 class="Title">
      <nuxt-link to="/" class="Title-link">CSS Houdini</nuxt-link>
      <small class="Title-note">experiments by <a href="https://twitter.com">@iamvdo</a></small>
    </h1>
    <ul class="Navigation-list">
      <li v-for="post in posts" class="Navigation-item">
        <nuxt-link :to="'/'+post.url" class="Navigation-link">{{post.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['posts'])
}
</script>

<style>
.Navigation {
  width: 250px;
  flex: 0 0 auto;
}
.Navigation-list {
  padding: .5rem;
}
.Navigation-item {
  font-size: .95em;
  padding: .25rem 0;
}
.Navigation-link {
  padding: 0 .5rem;
}
.Navigation-link:hover,
.Navigation-link:focus {
  background: rgba(0,0,0,.15);
}
.Navigation-link.nuxt-link-exact-active {
  background: radial-gradient(8px 8px at 4px 50%, yellow 50%, transparent 50%);
}
.Title {
  font-size: 1rem;
  padding: .5rem;
  line-height: 1;
  text-transform: uppercase;
  //background: yellow;
  //color: #3d464f;
  border-bottom: 1px solid #ddd;
  //border-right: 1px solid #ddd;
}
.Title-link {
  text-decoration: none;
  background: yellow;
  padding: 0 .25rem;
}
.Title-note {
  text-transform: none;
  font-size: .55rem;
  font-weight: normal;
  vertical-align: 2px;
  color: #aaa;
  margin-left: .25rem;
}
</style>
