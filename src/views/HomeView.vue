<script setup lang="ts">
import NoodleContents from '../components/NoodleContents.vue'
const trialCount : number = Number(import.meta.env.VITE_TRIAL_COUNT)
const wordLength : number = Number(import.meta.env.VITE_WORD_LENGTH)
const answerFormula : Array<string> = [...import.meta.env.VITE_ANSWER]
</script>

<template>
  <main>
    <NoodleContents :trial-count="trialCount" :word-length="wordLength"
                    :answer-formula="answerFormula"/>
  </main>
</template>
