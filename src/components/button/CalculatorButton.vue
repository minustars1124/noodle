<script setup lang="ts">
defineProps<{
  word: string
  status?: string
}>()
</script>

<template>
  <el-button :type="status" class="calculator-button">
    {{ word }}
  </el-button>
</template>

<style scoped lang="scss">
.calculator-button {
  height: 3.2em;
  font-size: var(--el-font-size-large);
  +.calculator-button {
    margin-left: 2px;
  }
}
</style>
