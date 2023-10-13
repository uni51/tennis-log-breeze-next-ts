import { RequiredMark } from '@/components/RequiredMark'
import { useFormContext } from 'react-hook-form'

type Props = {
  target: string
  label: string
  required: boolean
  size?: { cols?: number; rows: number }
}

export const TextArea: React.FC<Props> = ({
  target,
  label,
  required,
  size = { cols: 30, rows: 5 },
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='mb-5'>
      <div className='flex justify-start my-1 sm:my-2'>
        <p>{label}</p>
        {required && <RequiredMark />}
      </div>
      <textarea
        className='p-2 border rounded-md w-full outline-none'
        cols={size.cols}
        rows={size.rows}
        {...register(target, { required: required })}
      />
      {errors[`${target}`]?.message !== undefined && (
        <p className='py-3 text-red-500'>{errors[`${target}`]?.message!.toString()}</p>
      )}
    </div>
  )
}
