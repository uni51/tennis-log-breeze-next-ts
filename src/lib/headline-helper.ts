import {
  CATEGORY_BACKHAND,
  CATEGORY_FOREHAND,
  CATEGORY_SINGLES,
  CATEGORY_DOUBLES,
  CATEGORY_OTHER,
  CATEGORY_RETURN,
  CATEGORY_SERVE,
  CATEGORY_SMASH,
  CATEGORY_VOLLEY,
} from '@/constants/CategoryNameConst'

export const getMemosListByCategoryHeadLineTitle = (categoryNumber: number | undefined | null) => {
  const separator = ' : '
  switch (categoryNumber) {
    case 1:
      return separator + CATEGORY_FOREHAND
    case 2:
      return separator + CATEGORY_BACKHAND
    case 3:
      return separator + CATEGORY_SERVE
    case 4:
      return separator + CATEGORY_RETURN
    case 5:
      return separator + CATEGORY_VOLLEY
    case 6:
      return separator + CATEGORY_SMASH
    case 7:
      return separator + CATEGORY_SINGLES
    case 8:
      return separator + CATEGORY_DOUBLES
    case 99:
      return separator + CATEGORY_OTHER
    default:
      return ''
  }
}
