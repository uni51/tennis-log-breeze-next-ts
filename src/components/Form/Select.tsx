import { useFormContext } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'
import { SimpleSelect } from '@/types/form/SimpleSelect'

type Props = {
  target: SimpleSelect[]
  target_id: string
  label: string
  required: boolean
  defaultValue: string
  disabled?: boolean
}

export const Select: React.FC<Props> = ({
  target,
  target_id,
  label,
  required,
  defaultValue,
  disabled,
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
      <select
        defaultValue={defaultValue}
        {...register(target_id, { required: required })}
        disabled={disabled}
      >
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
