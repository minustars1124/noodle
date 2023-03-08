<script setup lang="ts">
import NoodleContents from '../components/NoodleContents.vue'
const mode: string = import.meta.env.MODE
const trialCount : number = Number(import.meta.env.VITE_TRIAL_COUNT)
const wordLength : number = Number(import.meta.env.VITE_WORD_LENGTH)
const answerFormula : Array<string> = [...import.meta.env.VITE_ANSWER]
    .map(word => {
      // .env.[mode] ファイルにある VITE_ANSWER では、∫ を I、dx を d と記載しているため、それぞれ置換する
      if (word === 'I') {return "∫"}
      if (word === 'd') {return "dx"}
      return word
    })
console.log(import.meta.env.MODE)
</script>

<template>
  <main>
    <NoodleContents :mode="mode" :trial-count="trialCount" :word-length="wordLength"
                    :answer-formula="answerFormula"/>
  </main>
</template>
