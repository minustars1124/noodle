<script setup lang="ts">
import CalculatorButton from './CalculatorButton.vue'
const props = defineProps<{
  mode: string
  status: Map<string, string>
}>()
/**
 * 親コンポーネントから関数を呼び出す
 */
const emits = defineEmits<{
  (e: "setSquares", word: string,) : void
  (e: "enter") : void
}>()
/**
 * 入力欄に指定した文字を設定します。
 * @param word 文字
 */
const setSquares = (word: string,) => {
  emits("setSquares", word)
}
/**
 * 指定した文字を持つボタンのステータスを更新します。
 * @param word 文字
 */
const updateStatus = (word: string) => {
  if (!props.status.has(word)) {
    return null
  }
  return props.status.get(word)
}
/**
 * 入力した計算式と回答が一致しているか確認します。
 */
const enter = () => {
  emits("enter")
}
</script>

<template>
  <div class="calculator-buttons">
    <div class="calculator-buttons__number">
      <CalculatorButton word="1" :status="updateStatus('1')" @click="setSquares('1')"/>
      <CalculatorButton word="2" :status="updateStatus('2')" @click="setSquares('2')"/>
      <CalculatorButton word="3" :status="updateStatus('3')" @click="setSquares('3')"/>
      <CalculatorButton word="4" :status="updateStatus('4')" @click="setSquares('4')"/>
      <CalculatorButton word="5" :status="updateStatus('5')" @click="setSquares('5')"/>
      <CalculatorButton word="6" :status="updateStatus('6')" @click="setSquares('6')"/>
      <CalculatorButton word="7" :status="updateStatus('7')" @click="setSquares('7')"/>
      <CalculatorButton word="8" :status="updateStatus('8')" @click="setSquares('8')"/>
      <CalculatorButton word="9" :status="updateStatus('9')" @click="setSquares('9')"/>
      <CalculatorButton word="0" :status="updateStatus('0')" @click="setSquares('0')"/>
    </div>
    <div v-show="mode === 'future1'" class="calculator-buttons__calculus">
      <CalculatorButton word="∫" :status="updateStatus('∫')" @click="setSquares('∫')"/>
      <CalculatorButton word="x" :status="updateStatus('x')" @click="setSquares('x')"/>
      <CalculatorButton word="dx" :status="updateStatus('dx')" @click="setSquares('dx')"/>
    </div>
    <div v-show="mode === 'future2'" class="calculator-buttons__metric">
      <CalculatorButton word="k" :status="updateStatus('k')" @click="setSquares('k')"/>
      <CalculatorButton word="m" :status="updateStatus('m')" @click="setSquares('m')"/>
      <CalculatorButton word="g" :status="updateStatus('g')" @click="setSquares('g')"/>
    </div>
    <div class="calculator-buttons__symbol">
      <CalculatorButton word="+" :status="updateStatus('+')" @click="setSquares('+')"/>
      <CalculatorButton word="-" :status="updateStatus('-')" @click="setSquares('-')"/>
      <CalculatorButton word="*" :status="updateStatus('*')" @click="setSquares('*')"/>
      <CalculatorButton word="/" :status="updateStatus('/')" @click="setSquares('/')"/>
      <CalculatorButton v-show="mode === 'future1'" word="^" :status="updateStatus('^')" @click="setSquares('^')"/>
      <CalculatorButton word="=" :status="updateStatus('=')" @click="setSquares('=')"/>
      <CalculatorButton word="Enter" @click="enter"/>
      <CalculatorButton word="Delete" @click="setSquares('')"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.calculator-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2px;
}
</style>
