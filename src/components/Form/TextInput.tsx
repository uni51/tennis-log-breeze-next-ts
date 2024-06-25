import { useFormContext } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'

type Props = {
  target: string
  label: string
  required: boolean
  subText?: string
}

export const TextInput: React.FC<Props> = ({ target, label, required, subText }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='mb-10'>
      <div className='flex justify-start my-1 sm:my-2'>
        <p>{label}</p>
        {required && <RequiredMark />}
        {subText && <p className='text-sm text-gray-500 ml-2 pt-1'>{subText}</p>}
      </div>
      <input
        className='p-2 border rounded-md w-full outline-none'
        {...register(target, { required: required })}
      />
      {errors[`${target}`]?.message !== undefined && (
        <p className='py-3 text-red-500'>{errors[`${target}`]?.message!.toString()}</p>
      )}
    </div>
  )
}
