<template>
  <div class="App">
    <div class="Header">
      <p class="Title">
        <nuxt-link to="/" class="Title-link">CSS Houdini</nuxt-link>
        <small class="Title-note"> experimental showcase by <a href="https://twitter.com/iamvdo">@iamvdo</a></small>
      </p>
      <div class="Support">Need latest Chrome with flag! <a href="https://ishoudinireadyyet.com">Support?</a></div>
    </div>
    <div class="Content">
      <Navigation/>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from '~/components/Navigation.vue'
export default {
  components: {
    Navigation
  },
  mounted () {
    // load every module
    var paintWorklet = CSS.paintWorklet || window.paintWorklet
    if (paintWorklet) {
      for (let i = 0; i < this.posts.length; i++) {
        const isPaint = this.posts[i].tags.includes('paint')
        if (isPaint) {
          paintWorklet.addModule(`./posts/${this.posts[i].url}/paint.js`)
        }
      }
    }
  },
  computed: mapGetters(['posts'])
}
</script>

<style>
:root {
  font-size: 10px;
}
body {
  font: 1.6rem / 2.6rem "Didact Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: hsl(210,10%,25%);
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: radial-gradient(300px at 0 0, white, hsl(210,25%,95%));
}

*, *:before, *:after {
  margin: 0;
}

a {
  color: inherit;
}
p,
ul {
  margin: 1.3rem 0 0 0;
}
p + ul {
  margin-top: .75rem;
}
p code,
ul code,
h1 code,
h2 code {
  line-height: 0;
}
button {
  font-family: "Didact Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
abbr {
  text-decoration: none;
  border-bottom: .05em solid rgba(0,0,0,.35);
}
.App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.Content {
  display: flex;
  flex: 1 0 auto;
}
@media (max-width: 800px) {
  .Content {
    flex-direction: column;
  }
}
.Header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .75rem;
}
.Title {
  color: hsl(210,10%,20%);
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0;
}
.Title-link {
  text-decoration: none;
  background: yellow;
  padding: 0 .25rem;
}
.Title-note {
  text-transform: none;
  font-size: .7em;
  font-weight: normal;
  vertical-align: 2px;
  color: hsl(210,10%,50%);
  margin-left: .25rem;
}
.Support {
  font-size: .75em;
}
.Support a {
  margin-left: 1rem;
}
@media (max-width: 550px) {
  .Header {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
  }
  .Support {
    position: static;
    padding: .5rem;
    text-align: center;
  }
}
.Post {
  flex: 1;
  padding: .75rem 1.3rem;
  background: white;
  box-shadow: 0 0 5px hsl(0, 0%, 80%);
}
.Post-title {
  color: hsl(210,10%,20%);
  line-height: 5.2rem;
}
.Post-content h2 {
  margin-top: 1.3rem;
}
@media (max-width: 800px) {
  .Header {
    padding: .75rem .5rem;
  }
  .Post {
    padding: .75rem .5rem;
  }
}
</style>
