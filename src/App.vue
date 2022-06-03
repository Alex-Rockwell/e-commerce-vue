<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
  text-rendering: optimizeSpeed;
}
.container {
  max-width: 1440px;
  margin: 0 auto;
}
body {
  font-family: 'Roboto', sans-serif;
}
</style>
