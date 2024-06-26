import React, { useEffect, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CustomToolbar from './CustomToolbar'
import { apiClient } from '@/lib/utils/apiClient'

interface EditorProps {
  value: string
  onBodyChange?: (body: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, onBodyChange }) => {
  const quillRef = useRef<ReactQuill>(null)

  // 画像ハンドラーの設定は useEffect 内で保持しますが、value の更新に基づく dangerouslyPasteHTML の呼び出しは削除します。
  useEffect(() => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      const toolbar = editor.getModule('toolbar')
      toolbar.addHandler('image', () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
          const file = input.files ? input.files[0] : null
          if (file) {
            const formData = new FormData()
            formData.append('image', file)

            try {
              const response = await apiClient.post('/api/dashboard/memos/upload-image', formData)
              if (response.status === 200) {
                const imageUrl = response.data.imageUrl
                const range = editor.getSelection()
                if (range) {
                  editor.insertEmbed(range.index, 'image', imageUrl)
                }
              } else {
                console.error('画像のアップロードに失敗しました。')
              }
            } catch (error) {
              console.error('画像のアップロード中にエラーが発生しました。', error)
            }
          }
        }
      })
    }
  }, [])

  const handleChange = (content: string) => {
    const isEmpty = content === '<p><br></p>'
    onBodyChange?.(isEmpty ? '' : content)
  }

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={(content, delta, source, editor) => handleChange(editor.getHTML())}
        modules={{
          toolbar: {
            container: '#toolbar',
          },
        }}
        formats={[
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'color',
          'background',
          'script',
          'header',
          'blockquote',
          'code-block',
          'indent',
          'list',
          'direction',
          'align',
          'link',
          'image',
          'video',
          'formula',
        ]}
      />
    </>
  )
}

export default Editor
