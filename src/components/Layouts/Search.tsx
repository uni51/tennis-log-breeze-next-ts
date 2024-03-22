import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { SetStateAction, useEffect, useState } from 'react'
import useSearchStore from '@/stores/searchStore'

export const Search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const setKeywordData = useSearchStore((state) => state.setKeywordData)

  // useEffect(() => {
  //   if (router.isReady) {
  //     const { q } = router.query
  //     if (q !== '') {
  //       setSearchQuery(q as string)
  //     }
  //   }
  // }, [router.query.q])
  useEffect(() => {
    if (router.isReady) {
      const q = router.query.q ?? ''
      setSearchQuery(q as string)
    }
  }, [router.isReady, router.query.q])

  const handleSearch = async () => {
    setKeywordData(searchQuery)

    let searchPath = ''
    // 管理画面配下の場合
    if (router.pathname.includes('admin')) {
      searchPath = '/admin/memos/search'
      // ダッシュボード（マイページ）配下の場合
    } else if (router.pathname.includes('dashboard')) {
      searchPath = '/dashboard/memos/search'
    } else {
      searchPath = '/memos/search'
    }

    router.push({
      pathname: searchPath,
      query: { q: searchQuery },
    })
  }

  const handleKeyPress = (event: { key: string; preventDefault: () => void }) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch()
    }
  }

  const handleChange = (event: { target: { value: string } }) => {
    // 全角スペースを半角スペースに変換
    const convertedValue = event.target.value.replace(/\u3000/g, ' ')
    setSearchQuery(convertedValue)
  }

  return (
    <form className='flex w-full md:ml-0' action='#' method='GET'>
      <label htmlFor='search-field' className='sr-only'>
        Search
      </label>
      <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
          <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
        </div>
        <input
          id='search-field'
          className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
          placeholder='Search'
          type='search'
          name='search'
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </form>
  )
}
