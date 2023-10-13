import React from 'react'

type Props = {
  children: React.ReactNode
  className?: string
}

export const LargeSubmitButton: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <button
        className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 mt-8 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
        type='submit'
      >
        {children}
      </button>
    </div>
  )
}
