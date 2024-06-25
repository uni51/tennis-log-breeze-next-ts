export const convertFullSpaceToHalfSpace = (inputString: string): string => {
  // 正規表現で全角スペースを検索して半角スペースに置換する
  var resultString = inputString.replace(/　/g, ' ')
  return resultString
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
