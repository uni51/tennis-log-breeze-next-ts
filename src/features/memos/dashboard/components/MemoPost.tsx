import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '@/components/Form/TextInput'
import { TextArea } from '@/components/Form/TextArea'
import { createMemo } from '@/features/memos/dashboard/lib/createMemo'
import { MemoPostSchema } from '@/features/memos/dashboard/lib/schema/MemoPostSchema'
import { Category } from '@/types/Category'
import { MemoForm } from '@/types/MemoForm'
import { Status } from '@/types/Status'
import { Select } from '@/components/Form/Select'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'

type Props = {
  statuses: Status[]
  categories: Category[]
}

const MemoPost: React.FC<Props> = ({ statuses, categories }) => {
  const defaultValues = {
    category_id: '1', // カテゴリーは、フォアハンドをデフォルト値にする
    status_id: '0', // ステータスは、下書きをデフォルト値にする
  }

  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(MemoPostSchema),
  })

  const { handleSubmit, setError } = useFormMethods

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data) => createMemo(data, setError))}>
          {/* タイトル */}
          <TextInput target={'title'} required={true} label={'タイトル'} />
          {/* 内容 */}
          <TextArea target={'body'} required={true} label={'内容'} size={{ rows: 12 }} />
          {/* カテゴリー */}
          <Select
            target={categories}
            target_id={'category_id'}
            required={true}
            label={'カテゴリー'}
            defaultValue={defaultValues?.category_id}
          />
          {/* ステータス */}
          <Select
            target={statuses}
            target_id={'status_id'}
            required={true}
            label={'ステータス'}
            defaultValue={defaultValues?.status_id}
          />
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default MemoPost
