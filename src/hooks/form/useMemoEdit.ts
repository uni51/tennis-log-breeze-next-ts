// hooks/useMemoEdit.ts
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { MemoPostSchema } from '@/lib/schema/MemoPostSchema'
import { Memo } from '@/types/Memo'
import { MemoForm } from '@/types/MemoForm'
import { Tag } from '@/types/memo/Tag'
import { postEditMemo } from '@/features/memos/dashboard/lib/postEditMemo'
import { postEditMemoForModify } from '@/features/memos/dashboard/lib/postEditMemoForModify'

export const useMemoEdit = (memo: Memo) => {
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
      postEditMemoForModify(data, useFormMethods.setError, memo.id, queryClient)
    } else {
      postEditMemo(data, useFormMethods.setError, memo.id, queryClient)
    }
  }

  return {
    useFormMethods,
    tags,
    body,
    errorMessage,
    errors,
    handleDelete,
    handleAddition,
    handleBodyChange,
    onSubmit,
  }
}
