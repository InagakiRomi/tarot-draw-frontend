<template>
  <!-- 星星背景層：固定全螢幕並置於最底 -->
  <div class="fixed inset-0 z-0">
    <StarsBackground />
  </div>
  <!-- 主內容層：置於星星之上 -->
  <div class="relative z-10 mx-[15px] border-10 border-[#ecca75] rounded-[15px]">
    <router-view />
    <div
      class="absolute w-[72px] h-[72px] max-[512px]:w-16 max-[512px]:h-16 bg-cover bg-[url('/images/background-moon.png')] top-[10px] left-[10px] rotate-135"
    ></div>
    <div
      class="absolute w-[72px] h-[72px] max-[512px]:w-16 max-[512px]:h-16 bg-cover bg-[url('/images/background-moon.png')] top-[10px] right-[10px] -rotate-135"
    ></div>
    <div
      class="absolute w-[72px] h-[72px] max-[512px]:w-16 max-[512px]:h-16 bg-cover bg-[url('/images/background-moon.png')] bottom-[10px] left-[10px] rotate-45"
    ></div>
    <div
      class="absolute w-[72px] h-[72px] max-[512px]:w-16 max-[512px]:h-16 bg-cover bg-[url('/images/background-moon.png')] bottom-[10px] right-[10px] -rotate-45"
    ></div>
  </div>
</template>

<script lang="ts">
import StarsBackground from '@/components/StarsBackground.vue'

export default {
  components: {
    StarsBackground,
  },
}
</script>
