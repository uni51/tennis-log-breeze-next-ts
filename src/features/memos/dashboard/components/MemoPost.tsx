// MemoPost.tsx
import dynamic from 'next/dynamic'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { WithContext as ReactTags } from 'react-tag-input'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { postCreateMemo } from '@/features/memos/dashboard/lib/postCreateMemo'
import { Category } from '@/types/Category'
import { Status } from '@/types/Status'
import { useMemoPost } from '@/hooks/form/useMemoPost'

const QuillEditor = dynamic(() => import('@/components/QuillEditor/Editor'), {
  ssr: false, // サーバーサイドレンダリングを無効にする
})

type Props = {
  statuses: Status[]
  categories: Category[]
}

const MemoPost: React.FC<Props> = ({ statuses, categories }) => {
  const defaultValues = {
    title: '',
    body: '',
    category_id: '1',
    status: '0',
    tags: [],
  }

  const {
    useFormMethods,
    tags,
    body,
    delimiters,
    errorMessage,
    errors,
    handleDelete,
    handleTagAddition,
    handleBodyAddition,
  } = useMemoPost(defaultValues)

  const { handleSubmit, setError } = useFormMethods

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
        <form onSubmit={handleSubmit((data) => postCreateMemo(data, setError))}>
          {/* タイトル */}
          <TextInput target={'title'} required={true} label={'タイトル'} />
          {/* 本文 */}
          <div className='flex justify-start my-1 sm:my-2'>
            <p>本文</p>
          </div>
          {/* <TextArea target={'body'} required={true} label={'内容'} size={{ rows: 12 }} /> */}
          <QuillEditor value={body} onBodyChange={handleBodyAddition} />
          {errors.body && <div className='text-red-500'>{errors.body.message}</div>}
          {/* カテゴリー */}
          <Select
            target={categories}
            target_id={'category_id'}
            required={true}
            label={'カテゴリー'}
            defaultValue={defaultValues?.category_id}
            style='mt-10 mb-10'
          />
          {/* タグ */}
          <div className='flex justify-start my-1 sm:my-2'>
            <p>タグ</p>
          </div>
          <ReactTags
            tags={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleTagAddition}
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
            defaultValue={defaultValues?.status}
            style='mt-10'
          />
          {/* 登録するボタン */}
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default MemoPost
