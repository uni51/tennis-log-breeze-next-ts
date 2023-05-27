export const getPageLink = (tag: string, page: number) => {
  return tag ? `/memos/tag/${tag}/page/${page}` : `/memos/page/${page}`
}
