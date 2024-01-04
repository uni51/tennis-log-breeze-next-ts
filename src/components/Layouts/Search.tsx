// SearchComponent.js

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { SetStateAction, useState } from 'react'
import useSearchStore from '@/stores/searchStore'

export const Search = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const setResponseData = useSearchStore((state) => state.setSearchData)

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://local-tennis-log.net/api/public/memos/search?q=${searchQuery}`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Extract JSON data from the response
      const responseData = await response.json()

      console.log('responseData', responseData)

      // Set responseData to Zustand store
      setResponseData(responseData)

      router.push({
        pathname: '/memos/search',
        query: { q: searchQuery },
      })
    } catch (error) {
      console.error('Error during search:', error)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Prevent the default behavior of the Enter key
      event.preventDefault()

      // Execute handleSearch when Enter key is pressed
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
