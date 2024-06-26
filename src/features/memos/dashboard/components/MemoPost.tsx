import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { WithContext as ReactTags } from 'react-tag-input'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { postCreateMemo } from '@/features/memos/dashboard/lib/postCreateMemo'
import { MemoPostSchema } from '@/features/memos/dashboard/lib/schema/MemoPostSchema'
import { Delimiters } from '@/lib/tags-helper'
import { Category } from '@/types/Category'
import { MemoForm } from '@/types/MemoForm'
import { Status } from '@/types/Status'
import { Tag } from '@/types/memo/Tag'

const QuillEditor = dynamic(() => import('@/components/QuillEditor/Editor'), {
  ssr: false, // サーバーサイドレンダリングを無効にする
})

type Props = {
  statuses: Status[]
  categories: Category[]
}

const MemoPost: React.FC<Props> = ({ statuses, categories }) => {
  // Add the onChange parameter
  const defaultValues = {
    category_id: '1',
    status: '0',
    tags: [],
  }
  const [tags, setTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')

  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(MemoPostSchema),
  })

  const { handleSubmit, setError, setValue } = useFormMethods

  const delimiters = Delimiters

  const handleDelete = (i: number) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((tag, index) => index !== i)
      setValue(
        'tags',
        newTags.map((tag) => tag.text),
      )
      return newTags
    })
  }

  const handleTagAddition = (tag: Tag) => {
    setTags([...tags, tag])

    // 直接フォームの値を更新
    setValue(
      'tags',
      [...tags, tag].map((tag) => tag.text),
    )
  }

  const handleBodyAddition = (body: string) => {
    setBody(body)
    // 直接フォームの値を更新
    setValue('body', body)
  }

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        <form onSubmit={handleSubmit((data) => postCreateMemo(data, setError))}>
          {/* タイトル */}
          <TextInput target={'title'} required={true} label={'タイトル'} />
          {/* 内容 */}
          {/* <TextArea target={'body'} required={true} label={'内容'} size={{ rows: 12 }} /> */}
          <QuillEditor value={body} onBodyChange={handleBodyAddition} />
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
            // suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleTagAddition}
            // handleDrag={handleDrag}
            // handleTagClick={handleTagClick}
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
