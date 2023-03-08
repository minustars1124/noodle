<script setup lang="ts">
import {Bowl} from '@element-plus/icons-vue'
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="title">
    <el-icon size="128">
      <Bowl/>
    </el-icon>
    <h1 class="title__main">{{ title }}</h1>
    <h3 class="title__sub">{{ subtitle }}</h3>
  </div>
</template>

<style scoped lang="scss">
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__main {
    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    top: -10px;
  }
  &__sub {
    font-size: 1.6rem;
  }
}

@media (min-width: 1024px) {
  .title {
    &__title {
      text-align: left;
    }
  }
}
</style>
