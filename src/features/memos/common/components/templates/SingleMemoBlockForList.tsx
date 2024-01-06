import Link from 'next/link'
import { FC } from 'react'
import { Memo } from '@/types/Memo'

type SingleMemoBlockForListProps = {
  memo: Memo
  renderMemoDetailLink: string
  renderMemoListByCategoryLink: string
  renderMemoListByNickNameLink: string
  renderMemoListByTagLink?: string
}

const SingleMemoBlockForList: FC<SingleMemoBlockForListProps> = ({
  memo,
  renderMemoDetailLink,
  renderMemoListByCategoryLink,
  renderMemoListByNickNameLink,
  renderMemoListByTagLink,
}) => {
  return (
    <div className='bg-gray-100 shadow-lg mb-5 p-4'>
      <p className='text-lg font-bold pt-2 pb-1'>
        <Link href={renderMemoDetailLink}>{memo.title}</Link>
      </p>
      <div className='border-b-2 border-gray-300 mb-4'></div>
      <p className='mb-3 whitespace-pre-wrap'>{memo.body}</p>
      <p className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-lg text-pink-600 bg-pink-200 last:mr-0 mr-1'>
        <Link href={renderMemoListByCategoryLink}>{memo.category_name}</Link>
      </p>
      <p className='mt-1'>
        {memo.tag_list.normalized.map((normalizedTag, index) => (
          <Link href={`${renderMemoListByTagLink}${normalizedTag}`} key={index} className='pr-1'>
            <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-blue-600 bg-blue-200 last:mr-0 mr-1'>
              {normalizedTag}
            </span>
          </Link>
        ))}
      </p>
      <p className='mt-1'>
        <Link href={renderMemoListByNickNameLink}>
          <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-green-600 bg-green-200 last:mr-0 mr-1'>
            {memo.user_nickname}
          </span>
        </Link>
      </p>
      <p className='mt-1'>
        <span className='text-xs font-semibold py-1 px-2 uppercase rounded-lg text-white bg-black last:mr-0 mr-1'>
          {memo.status === 0 && '下書き'}
          {memo.status === 1 && '公開中'}
          {memo.status === 2 && 'シェア'}
          {memo.status === 3 && '非公開'}
        </span>
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

export default SingleMemoBlockForList
