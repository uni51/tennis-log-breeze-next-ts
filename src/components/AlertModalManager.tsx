import { Dispatch, SetStateAction, useState } from 'react'
import ReactDOM from 'react-dom'

export interface AlertModalProps {
  title?: string
  message?: string
  onOk?: () => void
}

let setAlertModalContentGlobal: Dispatch<SetStateAction<AlertModalProps | null>>

export function showAlertModal(content: AlertModalProps) {
  setAlertModalContentGlobal(content)
}

export function closeAlertModal() {
  setAlertModalContentGlobal(null)
}

export const AlertModal: React.FC<AlertModalProps> = ({ title, message, onOk }) => {
  return (
    <div className='ma fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='max-w-lg rounded-lg bg-white p-8'>
        {title && <h2 className='mb-4 text-xl font-bold'>{title}</h2>}
        {message && <p className='mb-4 whitespace-pre-line'>{message}</p>}
        {onOk === undefined ? (
          <div className='flex justify-center'>
            <button
              onClick={closeAlertModal}
              className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
              Close
            </button>
          </div>
        ) : (
          <div className='flex justify-between'>
            <button
              onClick={closeAlertModal}
              className='rounded bg-gray-300 px-4 py-2 hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onOk()
                closeAlertModal()
              }}
              className='rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export const AlertModalManager = () => {
  const [alertModalContent, setAlertModalContent] = useState<AlertModalProps | null>(null)

  setAlertModalContentGlobal = setAlertModalContent

  if (!alertModalContent) return null

  return ReactDOM.createPortal(<AlertModal {...alertModalContent} />, document.body)
}
