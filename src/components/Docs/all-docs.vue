<template>
  <div class="wrapper">
    <div>
      <h2>全部：</h2>
    </div>

    <div v-for="docs in docsList" :key="docs.title" class="docs">
      <div class="content" @click="toPage(docs.url)">
        {{ docs.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { docsList } from '@/utils/mock'

const toPage = (url: string) => {
  window.open(url)
}
</script>

<style scoped>
.wrapper {
  padding: 20px;
  color: #ffffff;
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
