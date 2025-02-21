<script setup lang="ts">
import { useRouter } from 'vue-router'
import { docsList } from '@/utils/mock.ts'

const router = useRouter()
const toPage = (path: string) => {
  router.push(path)
}
</script>

<template>
  <el-card
    v-for="docs in docsList.filter((item) => item.isShowExample)"
    :key="docs.title"
    class="example"
  >
    <img
      v-if="docs.exampleUrl"
      :src="docs.exampleUrl"
      :style="{
        width: '300px',
        height: docs.height ? `${docs.height}px` : '300px'
      }"
    />
    <template #footer>
      <div class="card-header">
        <span>{{ docs.title }}</span>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.example {
  text-align: center;
  margin-bottom: 20px;
}
</style>
