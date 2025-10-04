<template>
  <div class="flex flex-col items-center">
    <img
      :src="displayInfo.imagePath"
      alt="tarotCard"
      :class="{ 'rotate-x-[180deg]': props.stance === reversed }"
      class="w-full max-w-[200px] max-[512px]:max-w-[140px] h-auto"
    />
    <p class="mt-2 max-[512px]:mt-1 text-2xl max-[512px]:text-lg text-[#e0e0ff] min-h-[1.5em]">
      {{ displayInfo.cardName || '\u00A0' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getCardDisplayInfo } from '@/utils/drawResultName'
import { reversed } from '@/constants/stanceArcana'

const props = defineProps<{
  cardId: number
  stance: string
}>()

const displayInfo = computed(() => getCardDisplayInfo(props.cardId, props.stance))
</script>
