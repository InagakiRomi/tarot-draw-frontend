import { tarotBackId } from '@/config/tarotConfig'
import { tarotCards } from '@/data/tarotCards'
import { upright, reversed } from '@/constants/stanceArcana'

/**
 * 根據卡牌 ID 與位向（stance）回傳對應的名稱與圖片路徑
 * @param id - 塔羅牌的卡牌 ID
 * @param stance - 卡牌的位向（正位或逆位）
 * @returns 回傳卡牌名稱與圖片名稱
 */
export function getCardDisplayInfo(
  id: number,
  stance: string,
): {
  cardName: string
  imagePath: string
} {
  // 從 id 撈出對應資料
  const found = tarotCards.find((card) => card.cardId === id)
  let cardName: string
  let cardUrl: string
  if (found) {
    if (id === tarotBackId) {
      cardName = found.cardName
    } else {
      if (stance === upright) {
        cardName = `${found.cardName}正位`
      } else if (stance === reversed) {
        cardName = `${found.cardName}逆位`
      } else {
        cardName = found.cardName
      }
    }
    cardUrl = found.cardUrl
  } else {
    cardName = '找不到卡片'
    cardUrl = 'tarotBack.jpg'
  }

  // 建立圖片路徑
  const imagePath = new URL(`../assets/tarot/${cardUrl}`, import.meta.url).href
  return { cardName, imagePath }
}
