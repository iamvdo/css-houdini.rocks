<template>
  <div class="Navigation">
    <h1 class="Title">
      <nuxt-link to="/" class="Title-link">CSS Houdini</nuxt-link>
      <small class="Title-note">experiments by <a href="https://twitter.com">@iamvdo</a></small>
    </h1>
    <a href="https://ishoudinireadyyet.com" class="Support">Support?</a>
    <ul class="Navigation-list">
      <li v-for="post in posts" class="Navigation-item">
        <nuxt-link :to="'/'+post.url" class="Navigation-link">{{post.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['posts'])
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
  --border-color: transparent;
  --border-size: 5px;
  padding: 0 .25rem;
  text-decoration: none;
  background: linear-gradient(var(--border-color) var(--border-size), transparent var(--border-size));
  background-position: 0 calc(100% - var(--border-size));
}
.Navigation-link:hover,
.Navigation-link:focus {
  --border-color: rgba(0,0,0,.1);
}
.Navigation-link.nuxt-link-exact-active {
  --border-color: yellow;
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
.Support {
  position: absolute;
  right: .5rem;
  top: .5rem;
  font-size: .75rem;
}
</style>
