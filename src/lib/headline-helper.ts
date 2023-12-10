import {
  CATEGORY_NAME_BACKHAND,
  CATEGORY_NAME_FOREHAND,
  CATEGORY_NAME_GAME,
  CATEGORY_NAME_OTHER,
  CATEGORY_NAME_RETURN,
  CATEGORY_NAME_SERVE,
  CATEGORY_NAME_SMASH,
  CATEGORY_NAME_VOLLEY,
} from '@/constants/CategoryNameConst'

export const getMemosListByCategoryHeadLineTitle = (categoryId: number | undefined | null) => {
  const separator = ' : '
  switch (categoryId) {
    case 1:
      return separator + CATEGORY_NAME_FOREHAND
    case 2:
      return separator + CATEGORY_NAME_BACKHAND
    case 3:
      return separator + CATEGORY_NAME_SERVE
    case 4:
      return separator + CATEGORY_NAME_RETURN
    case 5:
      return separator + CATEGORY_NAME_VOLLEY
    case 6:
      return separator + CATEGORY_NAME_SMASH
    case 7:
      return separator + CATEGORY_NAME_GAME
    case 8:
      return separator + CATEGORY_NAME_OTHER
    default:
      return ''
  }
}
