<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const toPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div @click="toPage('/leafer/ball')">
    消灭小球
  </div>

</template>

<style scoped>

</style>
