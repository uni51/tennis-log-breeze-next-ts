/** TODO 本番運用時には、エラーの詳細を非表示にして、代わりに、一般的なメッセージを出すこと */
const ErrorDisplayDuringCsr = ({
  headline,
  name,
  message,
  status,
  exception,
  config,
  resetErrorBoundary,
  stack,
}: any) => {
  return (
    <>
      <div>
        <div>エラー名称 : {name ?? 'Error'}</div>
        <p>エラーメッセージ : {message ?? 'Errorが発生しました'}</p>
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
    </>
  )
}

export default ErrorDisplayDuringCsr
