<script setup lang="ts">
import {Bowl} from '@element-plus/icons-vue'
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="greetings">
    <el-icon size="128">
      <Bowl/>
    </el-icon>
    <h1 class="greetings__title">{{ title }}</h1>
    <h3 class="greetings__subtitle">{{ subtitle }}</h3>
  </div>
</template>

<style scoped lang="scss">
.greetings {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    font-weight: 500;
    font-size: 2.6rem;
    text-align: center;
    top: -10px;
  }
  &__subtitle {
    font-size: 1.6rem;
  }
}

@media (min-width: 1024px) {
  .greetings {
    &__title {
      text-align: left;
    }
  }
}
</style>
