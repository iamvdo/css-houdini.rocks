<template>
  <div class="Navigation">
    <ul class="Navigation-list">
      <li v-for="(post, id) in posts" class="Navigation-item">
        <span v-if="newCategory(id)" class="Navigation-sep"></span>
        <nuxt-link :to="'/'+post.url" class="Navigation-link">{{post.title}}</nuxt-link>
        <span class="Tags">
          <span v-for="tag in post.tags" v-if="getAbbrTag(tag)" :title="getTag(tag)" :class="'Tag Tag--' + getAbbrTag(tag)">
            
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['posts', 'getAbbrTag']),
  methods: {
    getTag (id) {
      return this.$store.getters.getTag(id)
    },
    newCategory (id) {
      if (id === 0) {
        return false
      }
      return this.posts[id].category !== this.posts[id - 1].category
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
@media (max-width: 500px) {
  .Navigation-list {
    text-align: center;
  }
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
.Navigation-sep {
  display: block;
  margin-top: 1rem;
}
.Tags {
  display: inline-flex;
  margin-top: 6px;
  margin-left: 5px;
  float: right;
  opacity: .3;
}
@media (max-width: 500px) {
  .Tags {
    display: none;
  }
}
.nuxt-link-exact-active + .Tags {
  opacity: 1;
}
.Tag {
  display: inline-flex;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  justify-content: center;
  align-items: center;
  font-size: .5rem;
  border-radius: 50%;
  background: gray;
  color: #fff;
  cursor: default;
}
.Tag--P {
  background-color: deeppink;
}
.Tag--C {
  background-color: hsl(180, 92%, 40%);
}
.Tag--C\+ {
  background-color: hsl(180, 92%, 30%);
  letter-spacing: -1px;
}
@media (max-width: 800px) {
  .Navigation {
    width: auto;
    border-bottom: 1px solid #ddd;
    border-right: none;
  }
  .Navigation-item {
    display: inline-block;
    margin: 0 .5rem;
  }
  .Navigation-sep {
    display: inline-block;
    margin: 0;
  }
}
</style>
