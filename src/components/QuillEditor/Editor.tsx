import React, { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import CustomToolbar from './CustomToolbar'

interface EditorProps {
  value: string
  onBodyChange?: (body: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, onBodyChange }) => {
  const quillRef = useRef<ReactQuill>(null)

  // プロパティで受け取ったvalueをエディタに反映する
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor()
      editor.clipboard.dangerouslyPasteHTML(value)
    }
  }, [value])

  const handleChange = (content: string) => {
    // onBodyChangeが提供されている場合は、変更された内容を渡す
    if (onBodyChange) {
      onBodyChange(content)
    }
  }

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  }

  const formats = [
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
  ]

  return (
    <>
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        onChange={(content, delta, source, editor) => handleChange(editor.getHTML())}
        modules={modules}
        formats={formats}
      />
    </>
  )
}

export default Editor
