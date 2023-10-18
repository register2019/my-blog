<template>
  <div class="wrapper">
    <h2>文章列表：</h2>
    <div v-for="docs in docsList" :key="docs.title" class="docs">
      <el-link :href="docs.url" style="font-size: 18px">{{ docs.title }}</el-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { docsList } from './mock'
</script>

<style scoped>
.wrapper {
  margin: 20px 0;
}

.docs {
  height: 40px;
  line-height: 40px;
}
</style>
