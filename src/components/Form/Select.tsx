import { useFormContext } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'

type Props = {
  target: Category[] | Status[]
  target_id: string
  label: string
  required: boolean
  defaultValue: string
}

export const Select: React.FC<Props> = ({ target, target_id, label, required, defaultValue }) => {
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
      <select defaultValue={defaultValue} {...register(target_id, { required: required })}>
        {target.map((item, i) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {errors[`${target_id}`]?.message !== undefined && (
        <p className='py-3 text-red-500'>{errors[`${target_id}`]?.message!.toString()}</p>
      )}
    </div>
  )
}
