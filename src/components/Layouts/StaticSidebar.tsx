import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { navigation } from '@/lib/navigation/navigationData'
import { classNames } from '@/lib/utils/utils'

const StaticSidebar: React.FC = () => {
  return (
    <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
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
        <nav className='mt-5 flex flex-grow flex-col bg-white px-2' aria-label='Sidebar'>
          {navigation.map((item) =>
            !item.children ? (
              <Link
                key={item.name}
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
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  )}
                  aria-hidden='true'
                />
                {item.name}
              </Link>
            ) : (
              <Disclosure as='div' key={item.name} className='space-y-1'>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none',
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
  )
}

export default StaticSidebar
