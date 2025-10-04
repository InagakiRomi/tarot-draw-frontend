<template>
  <h1
    class="font-semibold text-[48px] max-[512px]:text-[40px] w-fit mt-10 max-[512px]:mt-[60px] mx-auto bg-linear-to-r from-[#efc16d] to-[#f0b433] bg-clip-text text-transparent [text-shadow:0_0_8px_rgba(250,234,189,0.8),0_0_16px_rgba(240,180,51,0.2),0_0_24px_rgba(239,193,109,0.1),0_0_40px_rgba(240,180,51,0.05)]"
  >
    線上抽塔羅
  </h1>

  <div
    class="flex justify-between items-center pt-[50px] pr-10 pl-[210px] max-[840px]:flex-col max-[840px]:pl-10 flex-wrap"
  >
    <div class="flex justify-center flex-1 gap-5 flex-wrap">
      <button
        class="btn-purple relative inline-block py-3 px-8 max-[512px]:py-3 max-[512px]:px-6 max-[512px]:text-lg text-xl tracking-[1.5px] text-[#ffeede] bg-linear-to-br from-[#6451b0] to-[#1f245c] border-2 border-[#dec0f1] rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none overflow-hidden transition-[background,box-shadow,transform] duration-200 hover:bg-linear-to-br hover:from-[#4c0054] hover:to-[#2d0030] hover:shadow-[0_0_25px_#caaeff,0_0_10px_#aa00ffcc] hover:scale-105 active:scale-95 active:shadow-[inset_0_0_6px_rgba(0,0,0,0.33)]"
        :class="{ selected: selectedDeck === majorType }"
        :disabled="selectedDeck === majorType"
        @click="selectDeck(majorType)"
      >
        大阿爾克那({{ majorCount }}張)
      </button>

      <button
        class="btn-purple relative inline-block py-3 px-8 max-[512px]:py-3 max-[512px]:px-6 max-[512px]:text-lg text-xl tracking-[1.5px] text-[#ffeede] bg-linear-to-br from-[#6451b0] to-[#1f245c] border-2 border-[#dec0f1] rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none overflow-hidden transition-[background,box-shadow,transform] duration-200 hover:bg-linear-to-br hover:from-[#4c0054] hover:to-[#2d0030] hover:shadow-[0_0_25px_#caaeff,0_0_10px_#aa00ffcc] hover:scale-105 active:scale-95 active:shadow-[inset_0_0_6px_rgba(0,0,0,0.33)]"
        :class="{ selected: selectedDeck === minorType }"
        :disabled="selectedDeck === minorType"
        @click="selectDeck(minorType)"
      >
        小阿爾克那({{ minorCount }}張)
      </button>
    </div>
    <div class="flex justify-end gap-2.5 max-[840px]:mt-5">
      <div class="relative flex flex-col items-center">
        <transition
          enter-active-class="transition-opacity duration-500"
          leave-active-class="transition-opacity duration-500"
          enter-from-class="opacity-0"
          leave-to-class="opacity-0"
        >
          <span
            v-if="showCopySuccess"
            class="absolute -top-[45px] bg-black/70 py-1 px-2.5 rounded-md text-[#ecca75] text-lg whitespace-nowrap animate-pop-in"
          >
            已複製！
          </span>
        </transition>
        <button
          class="btn-purple relative inline-block py-3 px-8 max-[512px]:py-3 max-[512px]:px-6 max-[512px]:text-lg text-xl tracking-[1.5px] text-[#ffeede] bg-linear-to-br from-[#6451b0] to-[#1f245c] border-2 border-[#dec0f1] rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none overflow-hidden transition-[background,box-shadow,transform] duration-200 hover:bg-linear-to-br hover:from-[#4c0054] hover:to-[#2d0030] hover:shadow-[0_0_25px_#caaeff,0_0_10px_#aa00ffcc] hover:scale-105 active:scale-95 active:shadow-[inset_0_0_6px_rgba(0,0,0,0.33)]"
          @click="handleCopy"
        >
          複製結果
        </button>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap justify-center items-center my-[60px] max-[512px]:my-10 gap-5">
    <label
      class="text-[22px] max-[512px]:text-xl max-[512px]:mb-1 mb-2.5 text-[#e0e0ff] [text-shadow:0_0_6px_rgba(255,255,255,0.2)]"
    >
      抽牌數量：
    </label>
    <input
      class="w-[180px] py-2.5 px-4 max-[512px]:py-2 max-[512px]:px-0.5 border border-[#a284ff] rounded-xl text-lg text-center bg-[rgba(85,67,136,0.3)] text-white outline-none shadow-[0_0_12px_rgba(162,132,255,0.5)] transition-[box-shadow,background,border] duration-300 focus:bg-[rgba(120,100,180,0.4)] focus:border-[#d3b3ff] focus:shadow-[0_0_16px_rgba(200,160,255,0.8)]"
      type="number"
      :min="cardsMin"
      :max="cardsMax"
      placeholder="輸入數字"
      v-model.number="inputCardCount"
    />
    <button
      class="btn-purple relative inline-block py-3 px-8 max-[512px]:py-3 max-[512px]:px-6 max-[512px]:text-lg text-xl tracking-[1.5px] text-[#ffeede] bg-linear-to-br from-[#6451b0] to-[#1f245c] border-2 border-[#dec0f1] rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] cursor-pointer select-none overflow-hidden transition-[background,box-shadow,transform] duration-200 hover:bg-linear-to-br hover:from-[#4c0054] hover:to-[#2d0030] hover:shadow-[0_0_25px_#caaeff,0_0_10px_#aa00ffcc] hover:scale-105 active:scale-95 active:shadow-[inset_0_0_6px_rgba(0,0,0,0.33)]"
      @click="updateCardCount"
    >
      修改數量
    </button>
  </div>

  <h2
    class="text-[22px] max-[512px]:text-xl text-[#efc16d] text-center px-5 [text-shadow:0_0_6px_rgba(255,255,255,0.2)]"
  >
    請在心中想好問題，並往下滑按下抽牌按鈕
  </h2>

  <div
    class="flex flex-wrap justify-center items-center my-[60px] max-[512px]:my-10 gap-5"
    :class="cardContainerClass"
    ref="cardContainer"
  >
    <TarotCard
      v-for="(id, index) in drawCardIds"
      :key="id + '-' + index"
      :card-id="id"
      :stance="drawCardStances[index] ?? 'upright'"
    />
  </div>

  <div class="flex flex-col items-center mt-10 mb-[70px]">
    <button
      class="btn-purple btn-draw-glow w-[200px] max-[512px]:w-[150px] py-4 px-10 max-[512px]:py-3 max-[512px]:px-5 text-[28px] max-[512px]:text-2xl scale-[1.03] relative inline-block tracking-[1.5px] text-[#ffeede] bg-linear-to-br from-[#6451b0] to-[#1f245c] border-2 border-[#dec0f1] rounded-xl shadow-[0_0_20px_#caaeffcc,0_0_40px_#caaeff66] cursor-pointer select-none overflow-hidden transition-[background,box-shadow,transform] duration-200 hover:bg-linear-to-br hover:from-[#4c0054] hover:to-[#2d0030] hover:shadow-[0_0_25px_#caaeff,0_0_10px_#aa00ffcc] hover:scale-105 active:scale-95"
      @click="drawTarotCard"
    >
      抽牌
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
}
</script>
<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, nextTick, ref, unref } from 'vue'
import TarotCard from '@/components/TarotCard.vue'
import {
  defaultCardCount,
  majorCount,
  maxTarotCardIdMajor,
  maxTarotCardIdMinor,
  minTarotCardId,
  minorCount,
  tarotBackId,
} from '@/config/tarotConfig'
import { ARCANA_TYPES, majorType, minorType, upright, reversed } from '@/constants/stanceArcana'
import { getCardDisplayInfo } from '@/utils/drawResultName'

/** 卡牌類型 */
type ArcanaType = (typeof ARCANA_TYPES)[keyof typeof ARCANA_TYPES]
/** 使用者目前選擇的卡牌組（預設為 'minor'） */
const selectedDeck = ref<ArcanaType>(minorType)
/** 最小可選擇的卡牌數量 */
const cardsMin = 1
/** 最大可選擇的卡牌數量 */
const cardsMax = computed(() => (selectedDeck.value === majorType ? majorCount : minorCount))

/** 實際顯示的卡牌數量 */
const cardCount = ref(defaultCardCount)
/** 使用者輸入的文字 */
const inputCardCount = ref(defaultCardCount)
/** 卡片容器的 DOM 元素引用 */
const cardContainer = ref<HTMLElement | null>(null)
/** 控制卡片容器的 class 名稱（用於動畫效果） */
const cardContainerClass = ref('animate-fade-in-up')

/** 觸發卡片容器的淡入動畫 */
function triggerFadeInAnimation(): void {
  cardContainerClass.value = ''
  nextTick(() => {
    requestAnimationFrame(() => {
      void cardContainer.value?.offsetWidth // 強制 reflow
      requestAnimationFrame(() => {
        cardContainerClass.value = 'animate-fade-in-up'
      })
    })
  })
}

/**
 * 檢查卡片數是否在設定的範圍內
 * @param count - 使用者輸入的卡片數
 * @returns 是否為合法卡片數
 */
function isValidCardCount(count: number): boolean {
  return count >= cardsMin && count <= cardsMax.value
}

/**
 * 嘗試更新卡牌數量，若成功更新則觸發淡入動畫，
 * 若失敗則 alert 提示使用者輸入錯誤範圍
 * @returns 是否成功更新卡牌數量
 */
function updateCardCount(): boolean {
  const count = inputCardCount.value
  if (isValidCardCount(count)) {
    cardCount.value = count
    triggerFadeInAnimation()
    generateCardBacks()
    return true
  }
  alert(`請輸入 ${cardsMin} 到 ${cardsMax.value} 之間的數字`)
  return false
}

/** 恢復預設卡牌數量 */
function restoreCardCount(): void {
  inputCardCount.value = defaultCardCount
  cardCount.value = defaultCardCount
  generateCardBacks()
  updateCardCount()
}

// --- 抽牌邏輯 (原 drawCards) ---
/** 存目前已抽出的牌 ID 陣列 */
const drawCardIds = ref<number[]>([])
/** 存目前已抽出的牌正逆陣列 */
const drawCardStances = ref<string[]>([])
/** 抽牌最小編號 id */
const minId = minTarotCardId
/** 抽牌最大編號 id */
let maxId: number

/**
 * 隨機取得一個 stanceType（正位或逆位）
 * @returns 隨機回傳 'upright' 或 'reversed'
 */
function getRandomStance(): string {
  const stances = [upright, reversed]
  const randomIndex = Math.floor(Math.random() * stances.length)
  const stance = stances[randomIndex]
  if (stance === undefined) {
    throw new Error(`Invalid stance type: "${stance}"`)
  }
  return stance
}

/** 更新抽牌最大 id */
function getMaxId(): void {
  if (selectedDeck.value === majorType) {
    maxId = maxTarotCardIdMajor
  } else if (selectedDeck.value === minorType) {
    maxId = maxTarotCardIdMinor
  } else {
    throw new Error(`ARCANA_TYPE "${selectedDeck.value}" does not exist.`)
  }
}

/** 初始化或重置抽牌狀態 */
function generateCardBacks(): void {
  const count = unref(cardCount)
  // 所有卡牌 ID 都是 tarotBackId
  drawCardIds.value = Array(count).fill(tarotBackId)
  // 所有卡牌 stance 都是 upright（正位）
  drawCardStances.value = Array(count).fill(upright)
  // 啟動動畫
  triggerFadeInAnimation()
}

/** 隨機抽塔羅牌 */
function drawTarotCard(): void {
  // 把目前能抽的卡存進去 drawBox 裡面
  const drawBox: number[] = []
  for (let i = minId; i <= maxId; i++) {
    drawBox.push(i)
  }
  // 依照目前場面的卡牌數量抽出相對應數量的牌
  const numberToDraw = unref(cardCount)
  const result: number[] = []
  const stances: string[] = []
  for (let i = 0; i < numberToDraw; i++) {
    // 抽出卡片
    if (drawBox.length === 0) break
    const randomIndex = Math.floor(Math.random() * drawBox.length)
    const drawnId = drawBox.splice(randomIndex, 1)[0]
    if (drawnId !== undefined) result.push(drawnId)

    // 抽出正逆位
    const isStance = drawnId === tarotBackId ? upright : getRandomStance()
    stances.push(isStance) // 儲存結果
  }
  // 更新狀態
  drawCardIds.value = result
  drawCardStances.value = stances
  triggerFadeInAnimation() // 抽卡動畫
}

/**
 * 更新使用者選擇的卡牌組
 * @param deck - 要選擇的卡牌組（'major' 或 'minor'）
 */
function selectDeck(deck: ArcanaType): void {
  selectedDeck.value = deck
  getMaxId()
  restoreCardCount()
}

// --- 複製結果 ---
const showCopySuccess = ref(false)

/** 將抽到的塔羅牌名稱複製到剪貼簿 */
async function copyDrawResult(showCopySuccessRef: Ref<boolean>) {
  const copyResult: string[] = []
  for (let i = 0; i < drawCardIds.value.length; i++) {
    const id = drawCardIds.value[i]
    const stance = drawCardStances.value[i]
    if (id === undefined || stance === undefined) continue
    copyResult.push(getCardDisplayInfo(id, stance).cardName)
  }
  await navigator.clipboard.writeText(copyResult.join('\n'))
  showCopySuccessRef.value = true
  setTimeout(() => {
    showCopySuccessRef.value = false
  }, 1500)
}

const handleCopy = async () => {
  await copyDrawResult(showCopySuccess)
}

generateCardBacks()
getMaxId()
</script>
