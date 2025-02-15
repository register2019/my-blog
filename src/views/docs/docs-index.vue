<template>
  <div class="wrapper">

    <Title color="#409EFF">
      <div class="title">
        <h2>文章列表：</h2>
        <el-button size="small" link style="color: #ffffff" @click="toAllDocs">
          更多<el-icon style="margin-left: 5px"><DArrowRight /></el-icon>
        </el-button>
      </div>
    </Title>

    <div v-for="docs in docsList.filter(item => item.isShowHome)" :key="docs.title" class="docs">
      <div class="content" @click="toPage(docs.url)">
        {{ docs.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { docsList } from '@/utils/mock.ts'
import { useRouter } from 'vue-router'
import Title from '@/components/common/Title.vue'

const toPage = (url: string) => {
  window.open(url)
}

const router = useRouter()
const toAllDocs = () => {
  router.push('/all-docs')
}
</script>

<style scoped>
.wrapper {
  padding: 20px 0;
  background-color: rgba(0, 0, 0, 0) !important;
  color: #ffffff;
}

.title {
  display: flex;
  justify-content: space-between;
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
