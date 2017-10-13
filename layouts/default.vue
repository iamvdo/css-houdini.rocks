<template>
  <div class="App">
    <div class="Header">
      <h1 class="Title">
        <nuxt-link to="/" class="Title-link">CSS Houdini</nuxt-link>
        <small class="Title-note">experiments by <a href="https://twitter.com">@iamvdo</a></small>
      </h1>
      <a href="https://ishoudinireadyyet.com" class="Support">Support?</a>
    </div>
    <div class="Content">
      <Navigation/>
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'
export default {
  components: {
    Navigation
  }
}
</script>

<style>
html {
  font-family: "Didact Gothic", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
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

.nuxt-progress {
  top: 2rem;
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
.Post {
  flex: 1;
  padding: .5rem;
}
.Post-desc {
  margin-top: 25px;
}
</style>
