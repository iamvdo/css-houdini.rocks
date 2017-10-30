<template>
  <div class="Post">
    <h1 class="Post-title">CSS Houdini Experiments</h1>
    <p class="Post-desc"></p>
    <div class="Post-content">
      <p>Here is my experiments with the latest CSS Houdini spec</p>
      <p>You’ll need the latest Chrome (with Web Platform flag enabled). See <a href="https://ishoudinireadyyet.com">support</a></p>
      <p><a href="https://github.com/iamvdo/houdini-experiments">Source code on GitHub</a></p>
      <h2>What is Houdini?</h2>
      <ul>
        <li>Specs: <a href="https://drafts.css-houdini.org/">https://drafts.css-houdini.org/</a></li>
        <li><a href="https://www.smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/">Houdini on Smashing Mag</a></li>
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
