import { Head } from 'next/document'
import AppLayout from '@/components/Layouts/AppLayout'

export const ContentsError = ({ name, message, status, config, stack, headline }: any) => {
  // const headline = `みんなの公開中のメモ一覧`

  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <div>
        <div>{name}</div>
        <p>{message}</p>
        <div>
          <p>{status}</p>
          <p>{config.url}</p>
          <p>{stack}</p>
        </div>
        {/* <div>エラーが発生しました</div> */}
      </div>
    </AppLayout>
  )
}
