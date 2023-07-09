import AppLayout from '@/components/Layouts/AppLayout'

/** TODO 本番運用時には、エラーの詳細を非表示にして、代わりに、一般的なメッセージを出すこと */
export const ContentsError = ({
  headline,
  name,
  message,
  status,
  exception,
  resetErrorBoundary,
}: any) => {
  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {headline ?? `エラーが発生しました`}
        </h2>
      }
    >
      <div>
        <div>エラー名称：{name ?? 'Error'}</div>
        <p>エラーメッセージ：{message ?? 'Errorが発生しました'}</p>
        <p>{exception ?? ''}</p>
        <p>ステータスコード : {status ?? ''}</p>
      </div>
      <button type='button' onClick={resetErrorBoundary}>
        reset button
      </button>
    </AppLayout>
  )
}
