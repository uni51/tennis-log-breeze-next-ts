import { RequiredMark } from '@/components/RequiredMark'
import { useFormContext } from 'react-hook-form'

type Props = {
  target: string
  label: string
  required: boolean
}

export const TextInput: React.FC<Props> = ({ target, label, required }) => {
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
