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
  style?: string
}

export const Select: React.FC<Props> = ({
  target,
  target_id,
  label,
  required,
  defaultValue,
  disabled,
  style,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className={style ? `${style} mb-5` : 'mb-5'}>
      <div className='flex flex-row items-center my-1 sm:my-2'>
        <label className='text-base'>{label}</label>
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
