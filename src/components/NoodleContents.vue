<script setup lang="ts">
import {ref} from 'vue'
import {ElMessage} from 'element-plus'
import FormulaInput from '@/components/input/FormulaInput.vue'
import CalculatorButtons from '@/components/button/CalculatorButtons.vue'

/**
 * 計算式を当てる試行回数（行番号に該当）
 */
const count = ref(0)
/**
 * フォーカスしている位置（列番号に該当）
 */
const focusPosition = ref(0)
/**
 * 回答
 */
const answer = ["3", "+", "2", "*", "8", "=", "1", "9"]
/**
 * 入力欄の文字列を保持する変数を作成
 */
const formulaTable = new Array<Array<string>>(6);
for (let x = 0; x < 6; x++) {
  formulaTable[x] = new Array<string>(8)
  for (let y = 0; y < 8; y++) {
    formulaTable[x][y] = ""
  }
}
const formula = ref(formulaTable)
/**
 * 入力した値と回答を比較した結果を保持する変数を作成
 */
const statusTable = new Array<Array<string>>(6);
for (let x = 0; x < 6; x++) {
  statusTable[x] = new Array<string>(8)
  for (let y = 0; y < 8; y++) {
    statusTable[x][y] = ""
  }
}
const status = ref(statusTable)
/**
 * ボタンのステータス
 */
const buttonStatus = ref(new Map<string, string>)
/**
 * 指定した数式が完全に一致したか
 */
const isFinished = ref<boolean>(false)
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
  if (isFinished.value) {
    ElMessage('既に正解しております。')
    return
  }
  if (count.value > 5) {
    ElMessage('既に終了しております。')
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
  } else if (focusPosition.value < 7) {
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
  if (isFinished.value) {
    ElMessage('既に正解しております。')
    return
  }
  if (count.value > 5) {
    ElMessage('既に終了しております。')
    return
  }
  if (formulaTable[count.value].some(word => word === "")) {
    ElMessage.error('数式が全て入力されておりません。');
    return
  }
  // 入力した数式と回答を比較し、数式とボタンのステータス情報を更新する
  for (let i = 0; i < 8; i++) {
    const value = formulaTable[count.value][i]
    if (answer[i] === value) {
      // 位置と文字列が一致すれば success を設定
      status.value[count.value][i] = "success"
      buttonStatus.value.set(value, "success")
    } else if (answer.some(word => word === value)) {
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
  if (status.value[count.value - 1].every(st => st === "success")) {
    console.log("You've finished eating Noodle!")
    ElMessage({
      message: count.value + '回目の入力で正解しました！',
      type: 'success',
    })
    isFinished.value = true
  }
  if (count.value >= 6) {
    ElMessage({
      message: '本日の問題は終了しました。',
      type: 'warning',
    })
  }
  focus(0)
}
</script>

<template>
  <div class="contents">
    <!-- 入力欄 -->
    <div class="contents__input">
      <div v-for="i of 6" :key="i" class="contents__input__row">
        <FormulaInput :row="i" :column="8" :squares="formula[i-1]" :status="status[i-1]"
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
    width: calc(50px * 8);
    &__row {
      display: flex;
      &__input {
        height: 40px;
      }
    }
  }
}
</style>
