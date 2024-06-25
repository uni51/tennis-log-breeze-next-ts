import { Dialog, Menu, Transition, Disclosure } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { PropsWithChildren, Fragment, ReactNode, useState } from 'react'
import Navigation from '@/components/Layouts/Navigation'
// import { useAuth } from '@/hooks/auth'
import { Search } from '@/components/Layouts/Search'
import { useAuth } from '@/hooks/auth'
import MSidebar from './MSidebar'

interface Props {
  header: ReactNode
}

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, current: true, href: '/dashboard' },
  {
    name: 'Memos',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'メモ一覧', href: '/memos' },
      { name: 'フォアハンド', href: '#' },
      { name: 'バックハンド', href: '#' },
      { name: 'サーブ', href: '#' },
      { name: 'リターン', href: '#' },
      { name: 'ボレー', href: '#' },
      { name: 'スマッシュ', href: '#' },
      { name: 'ゲーム', href: '#' },
      { name: 'その他', href: '#' },
    ],
  },
  {
    name: 'Projects',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'Overview', href: '#' },
      { name: 'Members', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
  {
    name: 'Calendar',
    icon: CalendarIcon,
    current: false,
    children: [
      { name: 'Overview', href: '#' },
      { name: 'Members', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
  {
    name: 'Documents',
    icon: InboxIcon,
    current: false,
    href: '/settings/profile',
    children: [
      { name: 'Overview', href: '#' },
      { name: 'テニススタイル', href: '/settings/play-style' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
  {
    name: 'Reports',
    icon: ChartBarIcon,
    current: false,
    children: [
      { name: 'Overview', href: '#' },
      { name: 'Members', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const AppLayout = ({ header, children }: PropsWithChildren<Props>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <MSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Static sidebar for desktop */}
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4'>
            <div className='flex flex-shrink-0 items-center px-4'>
              <Image
                className='h-8 w-auto'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                alt='Your Company'
                width={32}
                height={32}
              />
            </div>
            <div className='mt-5 flex flex-grow flex-col'>
              <nav className='flex-1 space-y-1 bg-white px-2' aria-label='Sidebar'>
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6',
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Disclosure as='div' key={item.name} className='space-y-1'>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
                            )}
                          >
                            <item.icon
                              className='mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                              aria-hidden='true'
                            />

                            <span className='flex-1'>{item.name}</span>
                            <svg
                              className={classNames(
                                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                              )}
                              viewBox='0 0 20 20'
                              aria-hidden='true'
                            >
                              <path d='M6 6L14 10L6 14V6Z' fill='currentColor' />
                            </svg>
                          </Disclosure.Button>
                          <Disclosure.Panel className='space-y-1'>
                            {item.children.map((subItem) => (
                              <Disclosure.Button
                                key={subItem.name}
                                as='a'
                                href={subItem.href}
                                className='group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ),
                )}
              </nav>
            </div>
          </div>
        </div>
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
                <Navigation {...user} />
              </div>
            </div>
          </div>

          {/* Page Heading */}
          <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{header}</div>
          </header>

          {/* Page Content */}
          <main className='flex-1'>
            {/* {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                // 子要素の props に searchResults を追加
                const updatedChild = React.cloneElement(
                  child as React.ReactElement<
                    PropsWithChildren<Props & { searchResults?: MemoListReturnType | undefined }>
                  >,
                  { searchResults },
                )
                return updatedChild
              }
              return child
            })} */}
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default AppLayout
