<template></template>

<script lang="ts" setup>
import { Leafer } from 'leafer-ui'
import { onUnmounted } from 'vue'
import { render } from './render'
const leafer = new Leafer({ view: window, fill: '#000000' })
render(leafer)

onUnmounted(() => {
  leafer.destroy()
})
</script>

<style lang="scss" scoped></style>
