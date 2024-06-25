import { Bars3BottomLeftIcon, BellIcon } from '@heroicons/react/24/outline'
import React, { PropsWithChildren, Fragment, ReactNode, useState } from 'react'
import AdminNavigation from './AdminNavigation'
import { Search } from '@/components/Layouts/Search'
import { useAdminAuth } from '@/hooks/adminAuth'
import AdminMSidebar from './AdminMSidebar'
import AdminStaticSidebar from './AdminStaticSidebar'

interface Props {
  header: ReactNode
}

const AdminAppLayout = ({ header, children }: PropsWithChildren<Props>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { admin } = useAdminAuth({ middleware: 'guest' })

  return (
    <>
      <div>
        {/* Sidebar for Mobile */}
        <AdminMSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Static sidebar for desktop */}
        <AdminStaticSidebar />

        <div className='flex flex-1 flex-col md:pl-64'>
          <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
            <button
              type='button'
              className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex flex-1 justify-between px-4'>
              <div className='flex flex-1'>
                <Search />
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <AdminNavigation admin={admin} />
              </div>
            </div>
          </div>

          {/* Page Heading */}
          <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{header}</div>
          </header>

          {/* Page Content */}
          <main className='flex-1'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default AdminAppLayout
