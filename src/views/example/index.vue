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
    <template #footer>
      <div class="card-header">
        <span>{{ docs.title }}</span>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.example {
  margin-bottom: 20px;
}
</style>
