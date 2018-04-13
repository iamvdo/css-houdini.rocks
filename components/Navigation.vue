<template>
  <div class="Navigation">
    <dl class="Navigation-list">
      <template  v-for="(post, id) in posts">
        <dt v-if="newCategory(id)" class="Navigation-sep">{{post.category}}</dt>
        <dd class="Navigation-item">
          <nuxt-link :to="'/'+post.url" class="Navigation-link" v-html="post.title"></nuxt-link>
          <span class="Tags">
            <span v-for="tag in post.tags" v-if="getAbbrTag(tag)" :title="getTag(tag)" :class="'Tag Tag--small Tag--' + getAbbrTag(tag)">
              {{getAbbrTag(tag)}}
            </span>
          </span>
        </dd>
      </template>
    </dl>
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
        return true
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
}
.Navigation-list {
  padding: .75rem;
  margin: 0;
  color: hsl(210,10%,30%);
}
@media (max-width: 500px) {
  .Navigation-list {
    text-align: center;
  }
}
.Navigation-item {
  display: flex;
  align-items: center;
  font-size: .95em;
}

.Navigation-link {
  --border-color: transparent;
  --border-size: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  line-height: 1.3rem;
  margin-top: 2.6rem;
  text-transform: uppercase;
  font-size: .5em;
  font-weight: bold;
  letter-spacing: .5px;
  color: deeppink;
}
.Navigation-sep:first-of-type {
  margin-top: 0;
}
.Tags {
  display: flex;
  margin-left: 5px;
  margin-top: 4px;
  opacity: .5;
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
  justify-content: center;
  align-items: center;
  font-size: .7em;
  border-radius: 50%;
  background: gray;
  color: #fff;
  cursor: default;
}
.Tag--small {
  width: 6px;
  height: 6px;
  color: transparent;
}
.Tag--P {
  background-color: deeppink;
}
.Tag--C {
  background-color: hsl(180, 92%, 30%);
}
.Tag--C\+ {
  background-color: hsl(180, 92%, 40%);
  letter-spacing: -1px;
}
@media (max-width: 800px) {
  .Navigation {
    width: auto;
    border-bottom: 1px solid #ddd;
    border-right: none;
  }
  .Navigation-list {
    padding: .75rem .5rem;
  }
  .Navigation-item {
    display: inline-flex;
    margin-right: 1.5rem;
  }
  .Navigation-sep {
    display: none;
  }
}
</style>
