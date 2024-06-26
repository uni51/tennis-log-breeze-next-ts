import Link from 'next/link'
import { useState } from 'react'
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { useAuthContext } from '@/features/auth/provider/AuthProvider'
import { useAuth } from '@/hooks/auth'
import { useAuthWithFirebase } from '@/hooks/useAuthWithFirebase'
import { isEmptyObject } from '@/lib/common-helper'
import { User } from '@/types/User'

const Navigation = (user: User) => {
  const { renderLogin } = useAuth({ middleware: 'guest' })
  const [open, setOpen] = useState(false)
  const auth = useAuthContext()
  if (!auth) {
    // handle the case when auth is null
    return null
  }
  // eslint-disable-next-line
  const { dispatch } = useAuthWithFirebase(auth)
  const handleLogout = () => dispatch({ type: 'logout' })

  return (
    <nav className='bg-white border-b border-gray-100'>
      {/* Primary Navigation Menu */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Settings Dropdown */}
          <div className='hidden sm:flex sm:items-center sm:ml-6'>
            <Dropdown
              align='right'
              width='48'
              trigger={
                <button className='flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out'>
                  <div>{user.data?.nickname}</div>

                  <div className='ml-1'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                </button>
              }
            >
              {/* Authentication */}
              {isEmptyObject(user) && <DropdownButton onClick={renderLogin}>Login</DropdownButton>}
              {!isEmptyObject(user) && (
                <>
                  <Link href='/settings/profile'>
                    <DropdownButton>Profile</DropdownButton>
                  </Link>
                  <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
                </>
              )}
            </Dropdown>
          </div>

          {/* Hamburger */}
          <div className='-mr-2 flex items-center sm:hidden'>
            <button
              onClick={() => setOpen((open) => !open)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out'
            >
              <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                {open ? (
                  <path
                    className='inline-flex'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    className='inline-flex'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <div className='block sm:hidden'>
          {/* Responsive Settings Options */}
          <div className='pt-4 pb-1 border-t border-gray-200'>
            <div className='flex items-center px-4'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-10 w-10 fill-current text-gray-400'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>

              <div className='ml-3'>
                <div className='font-medium text-base text-gray-800'>{user.data?.nickname}</div>
                <div className='font-medium text-sm text-gray-500'>{user.data?.email}</div>
              </div>
            </div>

            <div className='mt-3 space-y-1'>
              {/* Authentication */}
              {isEmptyObject(user) && (
                <ResponsiveNavButton onClick={renderLogin}>Login</ResponsiveNavButton>
              )}
              {!isEmptyObject(user) && (
                <>
                  <Link href='/settings/profile'>
                    <ResponsiveNavButton>Profile</ResponsiveNavButton>
                  </Link>
                  <ResponsiveNavButton onClick={handleLogout}>Logout</ResponsiveNavButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
