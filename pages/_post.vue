<template>
  <div class="Post">
    <div class="Post-header">
      <h1 class="Post-title" v-html="post.title"></h1>
      <ul class="Post-prevNext">
        <li class="Post-prevNextText">
          <nuxt-link v-if="prevPost" :to="'/'+prevPost.url">PREV</nuxt-link>
          <span class="Post-prevNextInactive" v-else>PREV</span>
        </li>
        <li class="Post-prevNextText">
          <nuxt-link v-if="nextPost" :to="'/'+nextPost.url">NEXT</nuxt-link>
          <span class="Post-prevNextInactive" v-else>NEXT</span>
        </li>
      </ul>
    </div>
    <h2 v-html="post.desc" class="Post-desc"></h2>
    <ul class="Post-tags">
      <li v-for="tag in tags" class="Post-tag">
        <span v-if="getAbbrTag(tag)" :class="'Tag Tag--' + getAbbrTag(tag)">{{getAbbrTag(tag)}}</span>
        {{getTag(tag)}}
      </li>
    </ul>
    <p><strong class="Warning">Support: </strong><span v-html="post.support"></span></p>
    <div class="Post-content" v-html="postContent"></div>
    <p v-if="isPaint"><a :href="registerPaintURL">See registerPaint module</a></p>
    <p v-if="isLayout"><a :href="registerLayoutURL">See registerLayout module</a></p>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

const posts = mapGetters(['posts'])

const loaded = {}

for (let i = 0; i < posts.length; i++) {
  loaded[posts[i].url] = false
}

export default {
  head () {
    const rex = /(<([^>]+)>)/ig
    const post = this.post
    const title = post.title.replace(rex, '')
    let desc = ''
    if (post.desc) {
      desc = post.desc.replace(rex, '')
    }
    return {
      title: 'CSS Houdini: ' + title + ' - @iamvdo',
      meta: [
        { hid: 'description', name: 'description', content: desc }
      ]
    }
  },
  mounted () {
    // Prims all the thing
    window.Prism.highlightAll()
    // LiveCoding
    window.LiveCoding()

    // if loaded for first time
    // registerProperties
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
    }
    // execute JS
    try {
      require(`~/static/posts/${this.id}/index.js`)()
    } catch (e) {}
  },
  computed: {
    ...mapGetters(['getAbbrTag']),
    id () {
      return this.$route.params.post
    },
    post () {
      return this.$store.getters.getPost(this.id)
    },
    prevPost () {
      return this.$store.getters.getPrevPost(this.id)
    },
    nextPost () {
      return this.$store.getters.getNextPost(this.id)
    },
    postContent () {
      return require(`~/static/posts/${this.id}/index.html`)
    },
    tags () {
      return this.post.tags
    },
    registerPaintURL () {
      return `/posts/${this.id}/paint.js`
    },
    registerLayoutURL () {
      return `/posts/${this.id}/layout.js`
    },
    isPaint () {
      return this.tags.filter(tag => {
        return tag === 'paint'
      }).length
    },
    isLayout () {
      return this.tags.filter(tag => {
        return tag === 'layout'
      }).length
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
.Post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Post-prevNext {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: .75em;
}
.Post-prevNextText + .Post-prevNextText {
  margin-left: .5rem;
}
.Post-prevNextInactive {
  opacity: .5;
}
@media (max-width: 575px) {
  .Post-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .Post-prevNext {
    order: -1;
    align-self: flex-end;
  }
}
.Post-desc {
  line-height: 2.6rem;
  font-size: 1.3em;
  color: hsl(210, 10%, 50%);
}
.Post-tags {
  padding: 0;
}
.Post-tag {
  display: inline-block;
  font-size: .75em;
  margin: 0 1rem 0 0;
}
.Post-tag .Tag {
  margin: 0;
  vertical-align: 1px;
}
.Demo {
  background: linear-gradient(to bottom right, #333, #111);
  color: #eee;
  padding: 25px 0 0 0;
  margin: 25px auto 0 auto;
  overflow: hidden;
}
.Controls {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  background: rgba(0,0,0,.25);
}
@media (max-width: 450px) {
  .Controls {
    grid-template-columns: 100%;
  }
}
@media (min-width: 1240px) {
  .Controls {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  }
}
.Control {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,.25);
}
@media (max-width: 450px) {
  .Control {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
  }
}
.Controls .Control {
  background: none;
  padding: .5rem 0;
}
.Control--row {
  flex-direction: row;
}
.Control--row-3 {
  grid-row: span 3;
}
.Demo > *:first-child + .Control {
  padding-top: 1rem;
}
.Control--first {
  padding-top: 1rem;
}
.Control:last-child {
  padding-bottom: 1rem;
}
.Control label {
  width: 250px;
  text-align: left;
}
.Control input,
.Control select {
  width: 150px;
}
@media (max-width: 450px) {
  .Control input,
  .Control select {
    flex: 1;
    width: auto;
  }
}
.Control p {
  width: 400px;
  text-align: left;
}
.Control * {
  vertical-align: middle;
}
.Control-title {
  font-weight: bold;
}
.Control-title + .Control {
  grid-column: 1;
}

.Code {
  display: block;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  position: relative;
  background: #3d464f;
  color: white;
  padding: 1em;
  margin: 0 auto 25px auto;
  white-space: pre-wrap;
  text-align: left;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
.Code + .Code {
  margin-top: -24px;
}
.Code code {
  outline: none;
  word-break: break-all;
}
.Code code[contenteditable]::after,
.Code code.language-js::after {
  content: 'LIVE EDIT';
  position: absolute;
  font-family: 'Didact Gothic';
  top: 0;
  right: 0;
  background: deeppink;
  color: #eee;
  padding: 0 .25rem;
  font-size: .7em;
  text-shadow: none;
}
.Code code.language-js::after {
  content: 'JS';
}
.Code mark {
  background: yellow;
  color: #3d464f;
  padding: 0 .25rem;
}
.Note {
  font-size: .8em;
  margin: 25px 0;
}
.Warning {
  color: crimson;
}
.embed .Post-content .Control,
.embed .Post-content .Code {
  font-size: 1.4em;
  font-weight: bold;
}
.embed .Demo {
  margin-top: 5px;
}
.embed .Post-content > p:first-of-type,
.embed .Post-content > ul:first-of-type,
.embed .Post-content > p:first-of-type ~ p,
.embed .Post-content > ul:first-of-type ~ p,
.embed .Post-content > ul:first-of-type ~ ul {
  display: none;
}
.embed .Control {
  justify-content: space-around;
}
.embed .Control input,
.embed .Control select,
.embed .Control label {
  width: 30%;
}
</style>