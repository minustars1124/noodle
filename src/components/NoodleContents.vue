<script setup lang="ts">
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import FormulaInput from '@/components/input/FormulaInput.vue'
import CalculatorButtons from '@/components/button/CalculatorButtons.vue'

const props = defineProps<{
  trialCount: number,
  wordLength: number,
  answerFormula: Array<String>,
}>()
/**
 * 計算式を当てる試行回数のカウンタ（行番号に該当）
 */
const count = ref(0)
/**
 * フォーカスしている位置（列番号に該当）
 */
const focusPosition = ref(0)
/**
 * 指定した数式が完全に一致したか
 */
const isFinished = ref<boolean>(false)
/**
 * 入力欄の文字列を保持する変数を作成
 */
const formulaTable = new Array<Array<string>>(props.trialCount);
for (let x = 0; x < props.trialCount; x++) {
  formulaTable[x] = new Array<string>(props.wordLength)
  for (let y = 0; y < props.wordLength; y++) {
    formulaTable[x][y] = ""
  }
}
const formula = ref(formulaTable)
/**
 * 入力した値と回答を比較した結果を保持する変数を作成
 */
const statusTable = new Array<Array<string>>(props.trialCount);
for (let x = 0; x < props.trialCount; x++) {
  statusTable[x] = new Array<string>(props.wordLength)
  for (let y = 0; y < props.wordLength; y++) {
    statusTable[x][y] = ""
  }
}
const status = ref(statusTable)
/**
 * ボタンのステータス
 */
const buttonStatus = ref(new Map<string, string>)
/**
 * 指定した列番号と現在の試行回数に対応する位置をフォーカスします。
 * @param column 列番号
 */
const focus = (column: number,) => {
  focusPosition.value = column
  const focus = document.getElementById('formula-number-' + count.value + '-' + column)
  if (focus != null) {
    focus.focus()
  }
}
/**
 * 指定した列番号と現在の試行回数に対応する場所を更新します。
 * @param word 文字列
 * @param column 列番号
 */
const update = (word: string, column: number,) => {
  formulaTable[count.value][column] = word
}
/**
 * フォーカス位置と現在の試行回数に対応する場所に文字列を設定します。
 * @param word 文字
 */
const setSquares = (word: string) => {
  // ゲームが終了していれば先の処理を行わない
  if (isGameOver()) {
    return
  }

  // 指定した文字列を試行回数を行番号、現在のフォーカス位置を列番号とした配列の位置に設定
  formula.value[count.value][focusPosition.value] = word
  // 文字列が空文字の場合
  if (word == '') {
    // フォーカス位置が最初でなければ1つ前に戻す、最初の場合はそのまま
    if (focusPosition.value !== 0) {
      focus(focusPosition.value - 1)
    } else {
      focus(focusPosition.value)
    }
  } else if (focusPosition.value < props.wordLength - 1) {
    // フォーカス位置が最後でなければ1つ先に進める
    focus(focusPosition.value + 1)
  } else {
    focus(focusPosition.value)
  }
}
/**
 * Enter ボタンを押した際の処理を実行します。
 */
const enter = () => {
  // ゲームが終了していれば先の処理を行わない
  if (isGameOver()) {
    return
  }
  // 入力した数式が正しいものでなければ先の処理を行わない
  if (!isCorrect()) {
    return
  }
  // 入力した数式と回答を比較し、数式とボタンのステータス情報を更新する
  for (let i = 0; i < props.wordLength; i++) {
    const value = formulaTable[count.value][i]
    if (props.answerFormula[i] === value) {
      // 位置と文字列が一致すれば success を設定
      status.value[count.value][i] = "success"
      buttonStatus.value.set(value, "success")
    } else if (props.answerFormula.some(word => word === value)) {
      // 文字列が含まれていれば primary を設定
      status.value[count.value][i] = "primary"
      // 初めて指定したか、既に位置まで一致した状態でなければ値を設定
      if (!buttonStatus.value.has(value) ||
          (buttonStatus.value.has(value) && buttonStatus.value.get(value) !== "success")) {
        buttonStatus.value.set(value, "primary")
      }
    } else {
      // 文字列が含まれていなければ info を設定
      status.value[count.value][i] = "info"
      buttonStatus.value.set(value, "info")
    }
  }
  // 試行回数をインクリメント
  count.value += 1
  // 全て位置と文字列が一致していれば正解とする
  if (status.value[count.value - 1].every(st => st === "success")) {
    ElMessage({
      message: count.value + '回目の入力で正解しました！',
      type: 'success',
    })
    isFinished.value = true
  }
  // count の値が trialCount 以上になったら問題は終了とする
  if (!isFinished.value && count.value >= props.trialCount) {
    ElMessage({
      message: '本日の問題は終了しました。',
      type: 'warning',
    })
  }
  focus(0)
}
/**
 * 指定されている数式が正しいものかを確認します。
 */
const isCorrect = () => {
  // 数式を入力する箇所に空文字があれば false
  if (formulaTable[count.value].some(word => word === "")) {
    ElMessage.error('数式が全て入力されておりません。入力を確認してください。');
    return false
  }
  // 数式に等号が 1 つも含まれていなければ false
  if (!formulaTable[count.value].some(word => word === '=')) {
    ElMessage.error('数式の中に等号が存在しておりません。入力を確認してください。');
    return false
  }
  // TODO: 逆ポーランド記法で入力した数式の等号が成り立つかを確認する処理を実装
  return true
}
/**
 * 既にゲームが終了しているかを返却します。
 * ゲームが終了している場合は、その内容に応じたメッセージを表示します。
 */
const isGameOver = () => {
  // isFinished が true であれば既に正解しているためメッセージを表示して終了
  if (isFinished.value) {
    ElMessage('本日の問題は既に正解しております。')
    return true
  }
  // count の値が trialCount 以上であれば既に試行回数を終了しているためメッセージを表示して終了
  if (count.value >= props.trialCount) {
    ElMessage('本日の問題は既に終了しております。')
    return true
  }
  return false
}
</script>

<template>
  <div class="contents">
    <!-- 入力欄 -->
    <div class="contents__input" :style="{'--word-length': props.wordLength}">
      <div v-for="i of props.trialCount" :key="i" class="contents__input__row">
        <FormulaInput :row="i" :column="props.wordLength" :squares="formula[i-1]" :status="status[i-1]"
                      :is-disabled="count !== i-1 || isFinished" @focus="focus" @update="update"/>
      </div>
    </div>
    <!-- ボタン -->
    <CalculatorButtons :status="buttonStatus" @setSquares="setSquares" @enter="enter"/>
  </div>
</template>

<style scoped lang="scss">
.contents {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__input {
    display: flex;
    flex-direction: column;
    width: calc(50px * var(--word-length));
    &__row {
      display: flex;
      &__input {
        height: 40px;
      }
    }
  }
}
</style>
