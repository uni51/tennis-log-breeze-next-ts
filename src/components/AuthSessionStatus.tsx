import { ReactNode } from 'react'

const AuthSessionStatus = ({
  status,
  className,
  ...props
}: {
  status: ReactNode
  className: string
}) => (
  <>
    {status && (
      <div
        className={`${className} font-medium text-sm text-green-600`}
        {...props}>
        {status}
      </div>
    )}
  </>
)

export default AuthSessionStatus
