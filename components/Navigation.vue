<template>
  <div class="Navigation">
    <ul class="Navigation-list">
      <li v-for="post in posts" class="Navigation-item">
        <nuxt-link :to="'/'+post.url" class="Navigation-link">{{post.title}}</nuxt-link>
        <!--
        <span v-for="tag in post.tags" :title="getTag(tag)" class="Navigation-tag">
          {{getAbbrTag(tag)}}
        </span>
        -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['posts']),
  methods: {
    getAbbrTag (id) {
      if (id === 'paint') {
        return 'P'
      }
    },
    getTag (id) {
      return this.$store.getters.getTag(id)
    }
  }
}
</script>

<style>
.Navigation {
  width: 250px;
  flex: 0 0 auto;
  border-right: 1px solid #ddd;
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
.Navigation-tag {
  font-size: .5rem;
  border-radius: 50%;
  background: deeppink;
  color: #fff;
  vertical-align: 2px;
  cursor: default;
}
@media (max-width: 800px) {
  .Navigation {
    width: auto;
    border-bottom: 1px solid #ddd;
    border-right: none;
  }
  .Navigation-item {
    display: inline-block;
    margin-right: 1rem;
  }
}
</style>
