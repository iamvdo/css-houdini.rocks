<template>
  <div class="Post">
    <h1 class="Post-title">CSS Houdini Experiments</h1>
    <p class="Post-desc"></p>
    <div class="Post-content">
      <p>Here is my experiments with the latest CSS Houdini spec. You’ll need the latest Chrome (with Web Platform flag enabled). See <a href="https://ishoudinireadyyet.com">support</a></p>
      <p><a href="https://github.com/iamvdo/houdini-experiments">Source code on GitHub</a></p>
      <h2>Let’s do it!</h2>
      <p>First, see <a href="animating-gradient">how to register a new custom property</a> (and why). Then, check <a href="slanted-backgrounds">how to write your own custom paint</a> to use with <code>background-image</code>. Or <a href="tooltip">borders</a>. Or <a href="corner-shape">CSS masks</a>.</p>
      <p>At the end, <a href="dynamic-hover-masks">interact with user inputs</a> and <a href="random-bubbles-mask">animate it !</a></p>
      <h2>Learn Houdini</h2>
      <ul>
        <li><a href="https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/">Houdini on Smashing Mag</a></li>
        <li><a href="https://codersblock.com/blog/say-hello-to-houdini-and-the-css-paint-api/">Houdini and the paint API</a></li>
      </ul>
      <h2>Specification links</h2>
      <ul>
        <li><a href="https://drafts.css-houdini.org/css-properties-values-api/">CSS Properties & Values API</a></li>
        <li><a href="https://drafts.css-houdini.org/css-typed-om/">CSS Typed OM</a></li>
        <li><a href="https://drafts.css-houdini.org/css-paint-api/">CSS Painting API</a></li>
        <li><a href="https://drafts.css-houdini.org/css-layout-api/">CSS Layout API</a></li>
        <li><a href="https://drafts.css-houdini.org/">All other Houdini specs</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['posts'])
}
</script>

<style>
</style>
