import parse, { HTMLReactParserOptions } from 'html-react-parser'

interface ExtractedContent {
  extractedText: string
  extractedYouTube: string | null
}

export const extractContent = (htmlContent: string): ExtractedContent => {
  let preYouTubeText: string = ''
  let postYouTubeText: string = ''
  let extractedYouTube: string | null = null
  let youtubeDetected = false

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (
        domNode.type === 'tag' &&
        domNode.name === 'iframe' &&
        domNode.attribs?.src.includes('youtube')
      ) {
        if (!extractedYouTube) {
          // 最初のYouTube動画を検出
          extractedYouTube = `<iframe ${Object.entries(domNode.attribs)
            .map(([key, value]) => `${key}="${value}"`)
            .join(' ')}></iframe>`
          youtubeDetected = true
          return
        }
      } else if (domNode.type === 'text' && !youtubeDetected) {
        preYouTubeText += domNode.data
      } else if (domNode.type === 'text' && youtubeDetected && postYouTubeText.length < 50) {
        postYouTubeText += domNode.data
      }
    },
  }

  parse(htmlContent, options)

  // 前後のテキストを適切な長さに調整
  if (youtubeDetected) {
    preYouTubeText = preYouTubeText.slice(-50) // 前の50文字
    postYouTubeText = postYouTubeText.slice(0, 50) // 後の50文字（最大）
  } else {
    preYouTubeText = preYouTubeText.slice(0, 100) // YouTube動画がない場合は最初の100文字
  }

  let extractedText = ''
  // 結合して返却
  if (
    (preYouTubeText && extractedYouTube && postYouTubeText) ||
    (preYouTubeText && extractedYouTube)
  ) {
    extractedYouTube =
      preYouTubeText.length > 50
        ? `${preYouTubeText}...${extractedYouTube}`
        : `${preYouTubeText}${extractedYouTube}`
  } else if (!preYouTubeText && extractedYouTube && postYouTubeText) {
    extractedYouTube =
      postYouTubeText.length > 50
        ? `${extractedYouTube}${postYouTubeText}...`
        : `${extractedYouTube}${postYouTubeText}`
  } else {
    extractedText = preYouTubeText.length > 50 ? `${preYouTubeText}...` : preYouTubeText
  }

  return { extractedText, extractedYouTube }
}
