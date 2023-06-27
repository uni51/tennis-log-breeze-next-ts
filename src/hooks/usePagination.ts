import { DOTS_STRING } from '@/constants/PaginationConst'

const getPages = (length: number, inc: number = 1) => Array.from({ length }, (_, i) => i + inc)

export default function usePagination(
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // -> 1 2 3 4 5
  if (totalPages <= 5) {
    return getPages(totalPages)
  }
  // -> 1 2 3 4 ... 10
  if (currentPage <= 3) {
    return [1, 2, 3, 4, DOTS_STRING, totalPages]
  }
  // -> 1 ... 4 5 6 ... 10
  if (currentPage < totalPages - 2) {
    return [1, DOTS_STRING, currentPage - 1, currentPage, currentPage + 1, DOTS_STRING, totalPages]
  }
  // -> 1 ... 7 8 9 10
  return [1, DOTS_STRING, ...getPages(4, totalPages - 3)]
}
