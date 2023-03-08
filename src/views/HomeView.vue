<script setup lang="ts">
import NoodleContents from '../components/NoodleContents.vue'
</script>

<template>
  <main>
    <NoodleContents :trial-count="6" :word-length="8"
                    :answer-formula="['3', '+', '2', '*', '8', '=', '1', '9']"/>
  </main>
</template>
