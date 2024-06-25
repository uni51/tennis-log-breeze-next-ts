// navigationData.ts
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

export const adminNavigation = [
  { name: 'Dashboard', icon: HomeIcon, current: true, href: '/admin/dashboard' },
  {
    name: 'Memos',
    icon: DocumentTextIcon,
    current: false,
    children: [
      { name: 'メモ一覧', href: '/admin/memos' },
      { name: 'レビュー待ちメモ一覧', href: '/admin/memos/waiting/review' },
      { name: '修正依頼中メモ一覧', href: '/admin/memos/waiting/fix' },
    ],
  },
  {
    name: 'Users',
    icon: UsersIcon,
    current: false,
    href: '/admin/users',
    children: [
      { name: 'Overview', href: '/admin/users' },
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
