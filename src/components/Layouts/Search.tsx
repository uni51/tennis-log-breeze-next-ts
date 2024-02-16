import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { SetStateAction, useEffect, useState } from 'react'
import useSearchStore from '@/stores/searchStore'

export const Search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const setKeywordData = useSearchStore((state) => state.setKeywordData)

  useEffect(() => {
    if (router.isReady) {
      const { q } = router.query
      setSearchQuery(q as string)
    }
  })

  const handleSearch = async () => {
    setKeywordData(searchQuery)

    const searchPath = router.pathname.includes('dashboard')
      ? '/dashboard/memos/search'
      : '/memos/search'

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

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value)
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
