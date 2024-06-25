// navigationData.ts
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const navigation = [
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

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]
