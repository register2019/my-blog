<template>
  <div class="wrapper">
    <h2>文章列表：</h2>
    <div v-for="docs in docsList" :key="docs.title" class="docs">
      <div class="content" @click="toPage(docs.url)">
        {{ docs.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { docsList } from './mock'

const toPage = (url: string) => {
  window.open(url)
}
</script>

<style scoped>
.wrapper {
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0) !important;
  color: aliceblue;
}

.docs {
  height: 40px;
  line-height: 40px;
}
.content {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 20px;
}
.content::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #409eff;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}
.content:hover::after {
  width: 100%;
}
</style>
