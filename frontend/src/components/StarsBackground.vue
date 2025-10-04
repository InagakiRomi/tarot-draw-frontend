<template>
  <canvas ref="canvasBg" class="stars-bg-canvas absolute inset-0 w-full h-full"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

/** 星星大小(最大值) */
const starSize = 500
/** 星星數量 */
const starCount = 300
/** 星星顏色 */
const starColor = '#e9e9fbff'
/** 星星閃爍速度(最大值) */
const maxDelta = 0.001
/** 星星閃爍速度(最小值) */
const minDelta = 0.005

/**
 * 星星物件 interface
 * @interface Star
 */
interface Star {
  /** 星星的 x 座標位置 */
  x: number
  /** 星星的 y 座標位置 */
  y: number
  /** 星星半徑大小 */
  radius: number
  /** 透明度 */
  alpha: number
  /** 每幀變化的量（閃爍速度） */
  delta: number
}

/** 用來儲存 canvas DOM 的參考 */
const canvasBg = ref<HTMLCanvasElement | null>(null)
/** 用來儲存清除動畫和事件監聽的函式 */
let cleanup: (() => void) | undefined

// 初始化 canvas 背景動畫
onMounted(() => {
  const el = canvasBg.value
  if (!el) return

  const context = el.getContext('2d')
  if (!context) return

  const canvas = el
  const ctx = context
  let stars: Star[] = []
  let animationFrameId: number

  /**
   * 生成星星資料（位置、透明度、閃爍速度等）
   */
  function createStars() {
    const radius = Math.min(canvas.width, canvas.height) / starSize
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * (canvas.width - 2 * radius) + radius
      const y = Math.random() * (canvas.height - 2 * radius) + radius
      const alpha = Math.random()
      const delta = Math.random() * maxDelta + minDelta
      stars.push({ x, y, radius, alpha, delta })
    }
  }

  /**
   * 根據視窗大小重設 canvas 尺寸並重新生成星星
   */
  function resizeCanvasAndResetStars() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    stars = []
    createStars()
  }

  /**
   * 每幀更新透明度並重新繪製所有星星
   */
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const star of stars) {
      star.alpha += star.delta
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta *= -1
        star.alpha = Math.max(0, Math.min(1, star.alpha))
      }
      ctx.globalAlpha = star.alpha
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fillStyle = starColor
      ctx.fill()
    }
    ctx.globalAlpha = 1
    animationFrameId = requestAnimationFrame(drawStars)
  }

  // 重設尺寸與星星、開始動畫、監聽 resize
  resizeCanvasAndResetStars()
  drawStars()
  window.addEventListener('resize', resizeCanvasAndResetStars)

  cleanup = () => {
    cancelAnimationFrame(animationFrameId)
    window.removeEventListener('resize', resizeCanvasAndResetStars)
  }
})

// 卸載時清理
onUnmounted(() => {
  cleanup?.()
})
</script>

<style scoped>
.stars-bg-canvas {
  background: radial-gradient(ellipse at center, #14213d 0%, #0a0f1d 100%);
}
</style>
