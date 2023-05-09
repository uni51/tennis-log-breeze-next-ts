import { ReactNode } from 'react'

const Label = ({
  className,
  children,
  ...props
}: {
  className: string
  children: ReactNode
}) => (
  <label
    className={`${className} block font-medium text-sm text-gray-700`}
    {...props}>
    {children}
  </label>
)

export default Label
