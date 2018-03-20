<template>
  <div class="App">
    <div class="Header">
      <div class="Header-title">
        <h1 class="Title">
          <nuxt-link to="/" class="Title-link">CSS Houdini</nuxt-link>
        </h1>
        <h2 class="Title-note">Experimental showcase by <a href="https://twitter.com/iamvdo">@iamvdo</a></h2>
      </div>
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
html {
  font-family: "Didact Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: #222;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  margin: 0;
}

a {
  color: inherit;
}
p,
ul {
  margin: 1rem 0;
}
button {
  font-family: "Didact Gothic", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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
  padding: .5rem;
  border-bottom: 1px solid #ddd;
}
.Header-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-wrap: wrap;
}
.Title {
  font-size: 1rem;
  text-transform: uppercase;
}
.Title-link {
  text-decoration: none;
  background: yellow;
  padding: 0 .25rem;
}
.Title-note {
  text-transform: none;
  font-size: .7rem;
  font-weight: normal;
  vertical-align: 2px;
  color: #aaa;
  margin-left: .25rem;
}
.Support {
  font-size: .75rem;
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
  padding: .5rem 1rem;
}
.Post-desc {
  margin-top: 25px;
}
@media (max-width: 800px) {
  .Post {
    padding: .5rem;
  }
}
</style>
