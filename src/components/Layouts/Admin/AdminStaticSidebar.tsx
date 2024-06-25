import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure } from '@headlessui/react'
import { adminNavigation } from '@/lib/navigation/adminNavigationData'
import { classNames } from '@/lib/utils/utils'

const AdminStaticSidebar: React.FC = () => {
  const router = useRouter()

  // ナビゲーション項目が現在のパスに一致するかどうかをチェック
  const isActive = (href: string | undefined) => router.asPath === href

  // 任意のナビゲーション項目の子がアクティブかどうかをチェック
  const isChildrenActive = (children: any[]) => {
    return children?.some((subItem) => isActive(subItem.href))
  }

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
          {adminNavigation.map((item) =>
            item.children ? (
              <Disclosure
                defaultOpen={isChildrenActive(item.children)}
                as='div'
                key={item.name}
                className='space-y-1'
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none',
                        isActive(item.href) || isChildrenActive(item.children)
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
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
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={classNames(
                            'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium',
                            isActive(subItem.href)
                              ? 'text-gray-900 bg-gray-50'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none',
                  isActive(item.href)
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                )}
              >
                <item.icon
                  className='mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                  aria-hidden='true'
                />
                <span className='flex-1'>{item.name}</span>
              </Link>
            ),
          )}
        </nav>
      </div>
    </div>
  )
}

export default AdminStaticSidebar
