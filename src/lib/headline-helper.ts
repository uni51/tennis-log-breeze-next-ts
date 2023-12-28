import {
  CATEGORY_FOREHAND,
  CATEGORY_BACKHAND,
  CATEGORY_SERVE,
  CATEGORY_RETURN,
  CATEGORY_VOLLEY,
  CATEGORY_SMASH,
  CATEGORY_SINGLES,
  CATEGORY_DOUBLES,
  CATEGORY_OTHER,
} from '@/constants/CategoryNameConst'

export const getMemosListByCategoryHeadLineTitle = (categoryId: number | undefined | null) => {
  const separator = ' : '
  switch (categoryId) {
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
    case 9:
      return separator + CATEGORY_OTHER
    default:
      return ''
  }
}
