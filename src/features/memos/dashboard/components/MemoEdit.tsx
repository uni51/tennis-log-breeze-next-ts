import React, { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useQueryClient } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { WithContext as ReactTags } from 'react-tag-input'
import { LargeSubmitButton } from '@/components/Form/LargeSubmitButton'
import { Select } from '@/components/Form/Select'
import { TextInput } from '@/components/Form/TextInput'
import { postEditMemo } from '@/features/memos/dashboard/lib/postEditMemo'
import { MemoPostSchema } from '@/features/memos/dashboard/lib/schema/MemoPostSchema'
import { Delimiters } from '@/lib/tags-helper'
import { Category } from '@/types/Category'
import { Memo } from '@/types/Memo'
import { MemoForm } from '@/types/MemoForm'
import { Status } from '@/types/Status'
import { Tag } from '@/types/memo/Tag'
import { postEditMemoForModify } from '../lib/postEditMemoForModify'

const QuillEditor = dynamic(() => import('@/components/QuillEditor/Editor'), {
  ssr: false,
})

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
    status: String(memo.status),
    tags: memo.tag_list.tags ?? [],
  }

  const [errorMessage, setErrorMessage] = useState<string>('')

  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(MemoPostSchema),
    mode: 'onChange',
  })

  const defaultTags = memo.tag_list.tags.map((tag) => ({
    id: tag,
    text: tag,
  }))

  const [tags, setTags] = useState<Tag[]>(defaultTags)
  const [body, setBody] = useState(memo.body)

  const {
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useFormMethods

  const queryClient = useQueryClient()

  useEffect(() => {
    setValue('body', memo.body)
  }, [memo.body, setValue])

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

  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag])
    setValue(
      'tags',
      [...tags, tag].map((tag) => tag.text),
    )
  }

  const handleBodyChange = (content: string) => {
    setBody(content)
    setValue('body', content, { shouldValidate: true })
  }

  const onSubmit = (data: MemoForm) => {
    if (data.status === '4') {
      // status が '4' の場合の処理
      postEditMemoForModify(data, setError, memo.id, queryClient)
    } else {
      // それ以外の場合の処理
      postEditMemo(data, setError, memo.id, queryClient)
    }
  }

  return (
    <FormProvider {...useFormMethods}>
      <div className='mx-auto w-4/5 mt-4 sm:mt-4 py-4 rounded-2xl'>
        {errorMessage && <div className='text-red-600'>{errorMessage}</div>}
        {/* <form
          onSubmit={handleSubmit((data) =>
            postEditMemo(data, setError, memo.id, queryClient, setErrorMessage),
          )}
        > */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput target={'title'} required={true} label={'タイトル'} />
          <QuillEditor value={body} onBodyChange={handleBodyChange} />
          {errors.body && <div className='text-red-500'>{errors.body.message}</div>}
          <Select
            target={categories}
            target_id={'category_id'}
            required={true}
            label={'カテゴリー'}
            defaultValue={defaultValues?.category_id}
            style='mt-10 mb-10'
          />
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
          <Select
            target={statuses}
            target_id={'status'}
            required={true}
            label={'ステータス'}
            defaultValue={defaultValues?.status}
            style='mt-10'
          />
          <LargeSubmitButton>登録する</LargeSubmitButton>
        </form>
      </div>
    </FormProvider>
  )
}

export default MemoEdit
