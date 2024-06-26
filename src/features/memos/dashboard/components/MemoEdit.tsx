// MemoEdit.tsx
import dynamic from 'next/dynamic'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { WithContext as ReactTags } from 'react-tag-input'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'
import { useMemoEdit } from '@/hooks/form/useMemoEdit'
import { Memo } from '@/types/Memo'
import { Delimiters } from '@/lib/tags-helper'

const QuillEditor = dynamic(() => import('@/components/QuillEditor/Editor'), {
  ssr: false,
})

type Props = {
  memo: Memo
  statuses: Status[]
  categories: Category[]
}

const MemoEdit: React.FC<Props> = ({ memo, statuses, categories }) => {
  const {
    useFormMethods,
    tags,
    body,
    errorMessage,
    errors,
    handleDelete,
    handleAddition,
    handleBodyChange,
    onSubmit,
  } = useMemoEdit(memo)

  const { handleSubmit } = useFormMethods

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* タイトル */}
          <TextInput target={'title'} required={true} label={'タイトル'} />
          {/* 本文 */}
          <div className='flex justify-start my-1 sm:my-2'>
            <p>本文</p>
          </div>
          <QuillEditor value={body} onBodyChange={handleBodyChange} />
          {errors.body && <div className='text-red-500'>{errors.body.message}</div>}
          {/* カテゴリー */}
          <Select
            target={categories}
            target_id={'category_id'}
            required={true}
            label={'カテゴリー'}
            defaultValue={String(memo.category_id)}
            style='mt-10 mb-10'
          />
          {/* タグ */}
          <div className='flex justify-start my-1 sm:my-2'>
            <p>タグ</p>
          </div>
          <ReactTags
            tags={tags}
            delimiters={Delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition='inline'
            autocomplete
            classNames={{
              tagInput: 'custom-tag-input',
            }}
          />
          {/* ステータス */}
          <Select
            target={statuses}
            target_id={'status'}
            required={true}
            label={'ステータス'}
            defaultValue={String(memo.status)}
            style='mt-10'
          />
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default MemoEdit
