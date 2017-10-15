<template>
  <div class="Post">
    <h1 class="Post-title">CSS Houdini Experiments</h1>
    <p class="Post-desc"></p>
    <div class="Post-content">
      <p>Here is my experiments with the latest CSS Houdini spec</p>
      <p>You'll need the latest Chrome Canary (or Chrome with Web Platform flag enabled). See <a href="https://ishoudinireadyyet.com">support</a></p>
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
