<script setup lang="ts">
type Props = {
  color?: string
}
const { color = 'blue' } = defineProps<Props>()
</script>

<template>
  <div class="wrapper">
    <div class="tag-wrapper">
      <div class="tag"></div>
    </div>
    <div style="width: calc(100% - 20px)">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
}
.tag-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}
.tag {
  height: 25px;
  border-left: 3px solid v-bind(color);
  border-radius: 3px;
}
</style>
