/** 卡牌正位逆位 */
const STANCE_TYPES = {
  /** 卡牌正位 */
  UPRIGHT: 'upright',

  /** 卡牌逆位 */
  REVERSED: 'reversed',
} as const

/** 卡牌正位逆位型別 */
export type stanceType = (typeof STANCE_TYPES)[keyof typeof STANCE_TYPES]

/** 卡牌正位 */
const upright = STANCE_TYPES.UPRIGHT

/** 卡牌逆位 */
const reversed = STANCE_TYPES.REVERSED

/** 卡牌類型常數 */
const ARCANA_TYPES = {
  /** 大阿爾克納 */
  MAJOR: 'major',

  /** 小阿爾克納 */
  MINOR: 'minor',
} as const

/** 大阿爾克納 */
const majorType = ARCANA_TYPES.MAJOR

/** 小阿爾克納 */
const minorType = ARCANA_TYPES.MINOR

export { STANCE_TYPES, upright, reversed, ARCANA_TYPES, majorType, minorType }
