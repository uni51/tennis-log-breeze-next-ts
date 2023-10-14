import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RequiredMark } from '@/components/RequiredMark'
import { editMemo } from '@/features/memos/dashboard/lib/editMemo'
import { MemoPostSchema } from '@/features/memos/dashboard/lib/schema/MemoPostSchema'
import { apiClient } from '@/lib/utils/apiClient'
import { Category } from '@/types/Category'
import { Memo } from '@/types/Memo'
import { Status } from '@/types/Status'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { MemoForm } from '@/types/MemoForm'
import { TextArea } from '@/components/Form/TextArea'
import { TextInput } from '@/components/Form/TextInput'

type Props = {
  memo: Memo
  statuses: Status[]
  categories: Category[]
}

const MemoEdit: React.FC<Props> = ({ memo, statuses, categories }) => {
  const defaultValues = {
    title: memo.title,
    body: memo.body,
    category_id: String(memo.category_id),
    status_id: String(memo.status),
  }

  // React-Hook-Form
  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(MemoPostSchema),
  })

  const { handleSubmit, setError } = useFormMethods

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data) => editMemo(data, setError, memo.id))}>
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

export default MemoEdit
