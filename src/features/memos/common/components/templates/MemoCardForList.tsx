import Link from 'next/link'
import { FC } from 'react'
import { Memo } from '@/types/Memo'
import parse from 'html-react-parser'
import { extractContent } from '@/lib/memo-helper'

type MemoCardForListProps = {
  memo: Memo
  renderMemoDetailLink: string
  renderMemoListByCategoryLink: string
  renderMemoListByNickNameLink: string
  renderMemoListByTagLink?: string
}

const MemoCardForList: FC<MemoCardForListProps> = ({
  memo,
  renderMemoDetailLink,
  renderMemoListByCategoryLink,
  renderMemoListByNickNameLink,
  renderMemoListByTagLink,
}) => {
  const { extractedText, extractedYouTube } = extractContent(memo.body)

  return (
    <div className='bg-gray-100 shadow-lg mb-5 p-4'>
      <p className='text-lg font-bold pt-2 pb-1'>
        <Link href={renderMemoDetailLink}>
          {memo.title.length > 50 ? memo.title.substring(0, 50) + '...' : memo.title}
        </Link>
      </p>
      <div className='border-b-2 border-gray-300 mb-4'></div>
      <p className='mb-3 whitespace-pre-wrap'>
        <Link href={renderMemoDetailLink} className='pb-6 text-slate-900'>
          {extractedYouTube ? parse(extractedYouTube) : parse(extractedText)}
        </Link>
        {memo.body.length > 70 && (
          <span className='text-xs font-semibold pl-2'>
            <Link href={renderMemoDetailLink} className='text-blue-600 hover:text-blue-800'>
              続きを読む<i className='fas fa-arrow-right'></i>
            </Link>
          </span>
        )}
      </p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-lg text-pink-600 bg-pink-200 last:mr-0 mr-1'>
        <Link href={renderMemoListByCategoryLink}>{memo.category_name}</Link>
      </p>
      <p className='mt-1'>
        {memo.tag_list.tags.map((tag, index) => (
          <Link href={`${renderMemoListByTagLink}${tag}`} key={index} className='pr-1'>
            <span className='inline-block text-xs font-semibold py-1 px-2 uppercase rounded-lg text-blue-600 bg-blue-200 last:mr-0 mt-1 mr-1'>
              {tag}
            </span>
          </Link>
        ))}
      </p>
      <p className='mt-1'>
        <Link href={renderMemoListByNickNameLink}>
          <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-green-600 bg-green-200 last:mr-0 mt-1 mr-1'>
            {memo.user_nickname}
          </span>
        </Link>
      </p>
      <p className='pt-1'>
        {memo.status !== 5 && (
          <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-black last:mr-0 mr-1'>
            {memo.status === 0 && '下書き'}
            {memo.status === 1 && '公開中'}
            {memo.status === 2 && 'シェア'}
            {memo.status === 3 && '非公開'}
          </span>
        )}
        {memo.status === 5 && (
          <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-red-500 last:mr-0 mr-1'>
            修正待ち
          </span>
        )}
      </p>
      <p className='text-sm leading-6 text-gray-500 mt-2 inline-block pr-4'>
        作成日時：{memo.created_at}
      </p>
      <p className='text-sm leading-6 text-gray-500 mt-2 inline-block'>
        更新日時：{memo.updated_at}
      </p>
    </div>
  )
}

export default MemoCardForList
