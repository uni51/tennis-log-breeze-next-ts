import AppLayout from '@/components/Layouts/AppLayout'

/** TODO 本番運用時には、エラーの詳細を非表示にして、代わりに、一般的なメッセージを出すこと */
export const ContentsError = ({ headline, name, message, status, config, stack }: any) => {
  return (
    <AppLayout
      header={<h2 className='font-semibold text-xl text-gray-800 leading-tight'>{headline}</h2>}
    >
      <div>
        <div>{name ?? 'Error'}</div>
        <p>{message ?? 'Errorが発生しました'}</p>
        <p>status code : {status ?? 500}</p>
        {/* {config.url && <p>{config.url}</p>} */}
        {/* {stack && <p>{stack}</p>} */}
      </div>
    </AppLayout>
  )
}
