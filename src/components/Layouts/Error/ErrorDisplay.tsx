import AppLayout from '@/components/Layouts/AppLayout'

/** TODO 本番運用時には、エラーの詳細を非表示にして、代わりに、一般的なメッセージを出すこと */
export const ErrorDisplay = ({
  headline,
  name,
  message,
  status,
  exception,
  config,
  stack,
  resetErrorBoundary,
}: any) => {
  return (
    <AppLayout
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {headline ?? `エラーが発生しました_app.tsx`}
        </h2>
      }
    >
      <div>
        <div>エラー名称 : {name ?? 'Error'}</div>
        <p>エラーメッセージ : {message ?? 'Errorが発生しました_app.tsx'}</p>
        {exception && <p>{exception}</p>}
        {status && <p>ステータスコード : {status}</p>}
        {config?.url && <p>URL : {config?.url}</p>}
        {/* <p>stack : {stack ?? ''}</p> */}
      </div>
      {resetErrorBoundary && (
        <button type='button' onClick={resetErrorBoundary}>
          reset button
        </button>
      )}
    </AppLayout>
  )
}
