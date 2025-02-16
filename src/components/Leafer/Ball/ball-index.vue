<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Leafer } from 'leafer-ui'
import { render } from '@/components/Leafer/Ball/render.ts'

const leafer = ref()
onMounted(() => {
  leafer.value = new Leafer({ view: window, fill: 'rgb(0, 0, 0)' })
  render(leafer.value)
})
onUnmounted(() => {
  leafer.value.destroy()
})
</script>

<template>

</template>

<style scoped>

</style>
