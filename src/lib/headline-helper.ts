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

export const getMemosListByCategoryHeadLineTitle = (categoryNumber: number | undefined | null) => {
  const separator = ' : '
  switch (categoryNumber) {
    case 1:
      return separator + CATEGORY_FOREHAND
    case 2:
      return separator + CATEGORY_SINGLE_BACKHAND
    case 3:
      return separator + CATEGORY_DOUBLE_BACKHAND
    case 4:
      return separator + CATEGORY_SERVE
    case 5:
      return separator + CATEGORY_RETURN
    case 6:
      return separator + CATEGORY_VOLLEY
    case 7:
      return separator + CATEGORY_SMASH
    case 8:
      return separator + CATEGORY_SINGLES
    case 9:
      return separator + CATEGORY_DOUBLES
    case 10:
      return separator + CATEGORY_GEAR
    case 99:
      return separator + CATEGORY_OTHER
    default:
      return ''
  }
}
