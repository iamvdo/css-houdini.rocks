<template>
  <div class="Post">
    <h1 class="Post-title">{{post.title}}</h1>
    <ul class="Post-tags">
      <li v-for="tag in tags" class="Post-tag">{{getTag(tag)}}</li>
    </ul>
    <p v-html="post.desc" class="Post-desc"></p>
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
    // Prims all the thing
    window.Prism.highlightAll()
    // if loaded for first time
    // registerProperties and addModule
    if (!loaded[this.id]) {
      loaded[this.id] = true
      if (this.post.properties && CSS.registerProperty) {
        this.post.properties.forEach(property => {
          CSS.registerProperty({
            name: property[0],
            syntax: property[1],
            inherits: property[2],
            initialValue: property[3]
          })
        })
      }
      var paintWorklet = CSS.paintWorklet || window.paintWorklet
      if (paintWorklet) {
        paintWorklet.addModule(this.registerPaintURL)
      }
    }
    // execute JS
    try {
      require(`~/static/posts/${this.id}/index.js`)()
    } catch (e) {}
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
    tags () {
      return this.post.tags
    },
    registerPaintURL () {
      return `/posts/${this.id}/paint.js`
    }
  },
  methods: {
    getTag (id) {
      return this.$store.getters.getTag(id)
    }
  }
}
</script>

<style>
.Post-tags {
  padding: 0;
}
.Post-tag {
  display: inline-block;
  font-size: .75rem;
  margin: 0 1rem 0 0;
  color: #aaa;
}
.Demo {
  background: linear-gradient(to bottom right, #333, #111);
  color: #eee;
  padding: 25px 0;
  margin: 25px auto 0 auto;
  overflow: hidden;
}
.Control {
  //text-align: center;
  display: flex;
  justify-content: center;
}
.Control label {
  width: 250px;
  text-align: left;
}
.Control input,
.Control select {
  width: 150px;
}
.Control p {
  width: 400px;
  text-align: left;
}
.Control * {
  vertical-align: middle;
}
@media (max-width: 450px) {
  .Control {
    flex-direction: column;
    padding: 0 1rem;
  }
  .Control input {
    flex: 1;
    width: auto;
  }
}
.Code {
  display: block;
  font-family: monospace;
  position: relative;
  background: #3d464f;
  color: #eee;
  padding: .5rem;
  margin: 0 auto 25px auto;
  white-space: pre-wrap;
}
.Code[contenteditable]::after {
  content: 'LIVE EDIT';
  position: absolute;
  top: 0;
  right: 0;
  background: yellow;
  color: #111;
  padding: 0 .25rem;
  font-size: .85rem;
}
.Code mark {
  background: yellow;
  color: #3d464f;
  padding: 0 .25rem;
}
.Note {
  font-size: .8rem;
  margin: 25px 0;
}
</style>