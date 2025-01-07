<template>
  <el-row class="wrapper">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="layer4"></div>
    <el-col :span="8"></el-col>
    <el-col :span="8"><docs-index /></el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script setup lang="ts">
import DocsIndex from './docs/docs-index.vue'
</script>

<style lang="scss"" scoped>
.wrapper {
  height: 100vh;
  background-color: #000;
}

@function get-box-shadow($count) {
  $shadow: ();
  @for $i from 1 through $count {
    $shadow: append($shadow, random(100) + vw random(100) + vh, comma);
  }
  @return $shadow;
}

$durations: 1000s;
@for $i from 1 through 4 {
  $size: #{$i}px;
  $durations: $durations / 2;
  $count: floor(200 / (4 - $i + 1));
  .layer#{$i} {
    position: fixed;
    left: 0;
    top: 0;
    width: $size;
    height: $size;
    border-radius: $size;
    box-shadow: get-box-shadow($count);
    animation: ball-move $durations linear infinite;
    &::after {
      content: '';
      position: fixed;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      box-shadow: inherit;
      left: 0;
      top: 100vh;
    }
  }
}

@keyframes ball-move {
  to {
    transform: translateY(-100vh);
  }
}

</style>
