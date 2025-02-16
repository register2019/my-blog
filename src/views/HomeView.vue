<template>
  <div v-if="currStatus" class="wrapper">
    <docs-index style="padding: 0 10px" />
    <Background />
  </div>

  <el-row v-else>
    <el-col :span="8">
      <Example />
    </el-col>
    <el-col :span="8"><docs-index /></el-col>
    <el-col :span="8">
      <Clock />
    </el-col>
    <Background />
  </el-row>
</template>

<script setup lang="ts">
import Clock from '@/components/Filp/index.vue'
import DocsIndex from './docs/docs-index.vue'
import Example from './example/index.vue'
import { onMounted, ref } from 'vue'
import Background from '@/components/Common/Background.vue'

const currStatus = ref(false)

function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'windows phone']
  for (let i = 0; i < mobileKeywords.length; i++) {
    if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
      return true
    }
  }
  return false
}

onMounted(() => {
  currStatus.value = isMobile()
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
