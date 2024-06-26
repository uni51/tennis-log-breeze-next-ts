// hooks/useMemoPost.ts
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { memoPostSchema } from '@/lib/schema/memoPostSchema'
import { Delimiters } from '@/lib/tags-helper'
import { MemoForm } from '@/types/MemoForm'
import { Tag } from '@/types/memo/Tag'

export const useMemoPost = (defaultValues: MemoForm) => {
  const [tags, setTags] = useState<Tag[]>([])
  const [body, setBody] = useState('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const useFormMethods = useForm<MemoForm>({
    defaultValues,
    resolver: zodResolver(memoPostSchema),
    mode: 'onChange',
  })

  const {
    setValue,
    formState: { errors },
  } = useFormMethods

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
    setValue(
      'tags',
      [...tags, tag].map((tag) => tag.text),
    )
  }

  const handleBodyAddition = (body: string) => {
    setBody(body)
    setValue('body', body, { shouldValidate: true })
  }

  return {
    useFormMethods,
    tags,
    body,
    errorMessage,
    errors,
    delimiters,
    handleDelete,
    handleTagAddition,
    handleBodyAddition,
  }
}
