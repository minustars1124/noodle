<script setup lang="ts">
import {ref, computed} from 'vue'

const props = defineProps<{
  mode: string
  row: number
  column: number
  squares: Array<string>
  status: Array<string>
  isDisabled: boolean
}>()
const focusColumn = ref()
/**
 * 親コンポーネントから関数を呼び出す
 */
const emits = defineEmits<{
  (e: "focus", column: number,) : void
  (e: "update", word: string, column: number,) : void
}>()
/**
 * props.squares の値を元に入力欄の値を設定
 */
const model = computed({
  get: () => props.squares,
  set: (value) => {
    emits("update", value[focusColumn.value - 1], focusColumn.value)
  }
})
/**
 * 入力された文字列に対して formatter をかけます。
 * @param value 文字列
 */
const formatter = (value: string,) => {
  switch (props.mode) {
    // 数字と四則計算、等号以外は設定できないように置換する
    case 'future1':
      // 微積の記号も対象とする
      return value.replace(/[^\d+\-*/=^dxI∫]/g, '')
          .replace(/[d]/g, 'dx')
          .replace(/[I]/g, '∫')
    case 'future2':
      // メートル法の記号も対象とする
      return value.replace(/[^\d+\-*/=mkg]/g, '')
    default:
      return value.replace(/[^\d+\-*/=]/g, '')
  }
}
/**
 * 入力欄にフォーカスした場合の処理を実行します。
 * @param column 列番号
 */
const focus = (column: number,) => {
  focusColumn.value = column
  emits("focus", column)
}
/**
 * 入力欄に文字を入力した場合の処理を実行します。
 * @param value 文字
 */
const input = (value: any,) => {
  model.value[focusColumn.value] = value
}
</script>

<template>
  <div class="formula-input">
    <div v-for="i of column" :key="i" class="formula-input__column">
      <el-input :model-value="model[i-1]" maxlength="1" :formatter="(value) => formatter(value)"
                :disabled="isDisabled" @focus="focus(i-1)" @input="input" class="formula-input__column__input"
                :id="'formula-number-' + (row - 1) + '-' + (i - 1)" :class="status[i-1]"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.formula-input {
  display: flex;
  &__column {
    &__input {
      height: 40px;
      font-size: var(--el-font-size-large);
      :deep(.el-input__inner) {
        color: var(--el-color-white);
        -webkit-text-fill-color: var(--el-color-white);
        text-align: center;
      }
      :deep(.el-input__wrapper) {
        background-color: var(--el-color-warning);
      }
      :deep(.el-input__wrapper.is-focus) {
        background-color: var(--el-color-warning-light-3);
        box-shadow: 0 0 0 2px var(--el-input-focus-border) inset;
      }
      :focus {
        caret-color: transparent;
      }
      &.success {
        :deep(.el-input__wrapper) {
          background-color: var(--el-color-success);
        }
      }
      &.primary {
        :deep(.el-input__wrapper) {
          background-color: var(--el-color-primary);
        }
      }
      &.info {
        :deep(.el-input__wrapper) {
          background-color: var(--el-color-info);
        }
      }
    }
  }
}
</style>
