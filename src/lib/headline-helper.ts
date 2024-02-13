import {
  CATEGORY_FOREHAND,
  CATEGORY_SINGLE_BACKHAND,
  CATEGORY_DOUBLE_BACKHAND,
  CATEGORY_SERVE,
  CATEGORY_RETURN,
  CATEGORY_VOLLEY,
  CATEGORY_SMASH,
  CATEGORY_SINGLES,
  CATEGORY_DOUBLES,
  CATEGORY_GEAR,
  CATEGORY_OTHER,
} from '@/constants/CategoryNameConst'

export const getCategoryText = (category: number | undefined | null) => {
  switch (category) {
    case 1:
      return CATEGORY_FOREHAND
    case 2:
      return CATEGORY_DOUBLE_BACKHAND
    case 3:
      return CATEGORY_SINGLE_BACKHAND
    case 4:
      return CATEGORY_SERVE
    case 5:
      return CATEGORY_RETURN
    case 6:
      return CATEGORY_VOLLEY
    case 7:
      return CATEGORY_SMASH
    case 8:
      return CATEGORY_SINGLES
    case 9:
      return CATEGORY_DOUBLES
    case 10:
      return CATEGORY_GEAR
    case 99:
      return CATEGORY_OTHER
    default:
      return ''
  }
}
