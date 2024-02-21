import React, { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import ReactQuill, { Quill } from 'react-quill'
// import ImageResize  from 'quill-image-resize-module';
import 'react-quill/dist/quill.snow.css'
import CustomToolbar from './CustomToolbar'

interface EditorProps {
  value: string
  onBodyChange?: (body: string) => void
}

// Quill.register('modules/ImageResize',ImageResize);
const Editor: React.FC<EditorProps> = ({ value, onBodyChange }) => {
  const [text, setText] = useState('')

  const handleChange = (html: string) => {
    setText(html)
    if (onBodyChange) {
      onBodyChange(html)
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
      <ReactQuill value={value} onChange={handleChange} modules={modules} formats={formats} />
    </>
  )
}

export default Editor
