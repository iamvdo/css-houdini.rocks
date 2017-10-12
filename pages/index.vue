<template>
  <div class="Post">
    <h1 class="Post-title">CSS Houdini Experiments</h1>
    <p class="Post-desc"></p>
    <div class="Post-content">
      <p>Here is my experiments with the latest CSS Houdini spec</p>
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
