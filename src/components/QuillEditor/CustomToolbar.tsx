import React from 'react'
import formats from './ToolbarOptions'

// formatDataの型を定義します。
interface FormatData {
  className: string
  value?: string
  options?: string[]
}

const renderOptions = (formatData: FormatData) => {
  const { className, options } = formatData
  return (
    <select className={className}>
      <option selected={true}></option>
      {options?.map((value) => (
        <option value={value} key={value}></option> // key属性を追加して一意性を保証することを忘れないでください。
      ))}
    </select>
  )
}

const renderSingle = (formatData: FormatData) => {
  const { className, value } = formatData
  return <button className={className} value={value}></button>
}

const CustomToolbar: React.FC = () => (
  <div id='toolbar'>
    {formats.map((classes, index) => (
      <span className='ql-formats' key={index}>
        {' '}
        {/* key属性を追加 */}
        {classes.map((formatData: FormatData, index) => {
          return formatData.options ? renderOptions(formatData) : renderSingle(formatData)
        })}
      </span>
    ))}
  </div>
)

export default CustomToolbar
