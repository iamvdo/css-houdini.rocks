<template>
  <div class="Post">
    <h1 class="Post-title">{{post.title}}</h1>
    <div class="Post-content" v-html="postContent"></div>
    <p><a :href="registerPaintURL">See registerPaint module</a></p>
  </div>
</template>

<script>

const loaded = {}

const state = require('~/store/data')
for (let i = 0; i < state.posts.length; i++) {
  loaded[state.posts[i].url] = false
}

export default {
  mounted () {
    // if loaded for first time
    // registerProperties and addModule
    if (!loaded[this.id]) {
      loaded[this.id] = true
      this.post.properties.forEach(property => {
        CSS.registerProperty({
          name: property[0],
          syntax: property[1],
          inherits: property[2],
          initialValue: property[3]
        })
      })
      var paintWorklet = CSS.paintWorklet || window.paintWorklet
      paintWorklet.addModule(this.registerPaintURL)
    }
    // execute JS
    require(`~/static/posts/${this.id}/index.js`)()
  },
  computed: {
    id () {
      return this.$route.params.post
    },
    post () {
      return this.$store.getters.getPost(this.id)
    },
    postContent () {
      return require(`~/static/posts/${this.id}/index.html`)
    },
    registerPaintURL () {
      return `/posts/${this.id}/paint.js`
    }
  }
}
</script>

<style>
.Post {
  flex: 1 0 auto;
  padding: .5rem;
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.Control {
  text-align: center;
}
.Control * {
  vertical-align: middle;
}
.Code {
  background: #3d464f;
  color: #eee;
  padding: .5rem;
  margin: 50px auto;
}
.Code span {
  background: yellow;
  color: #3d464f;
  padding: 0 .25rem;
}
.Note {
  font-size: .8rem;
  margin: 25px 0;
}
</style>