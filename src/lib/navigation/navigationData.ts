import { Memo } from './../../types/Memo'
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

export const navigation = [
  { name: 'Dashboard', icon: HomeIcon, current: false, href: '/dashboard' },
  {
    name: 'Memos',
    icon: DocumentTextIcon,
    current: false,
    children: [
      { name: 'メモ一覧', href: '/memos' },
      { name: 'フォアハンド', href: '/memos?category=1' },
      { name: '両手バックハンド', href: '/memos?category=2' },
      { name: '片手バックハンド', href: '/memos?category=3' },
      { name: 'サーブ', href: '/memos?category=4' },
      { name: 'リターン', href: '/memos?category=5' },
      { name: 'ボレー', href: '/memos?category=6' },
      { name: 'スマッシュ', href: '/memos?category=7' },
      { name: 'シングルス', href: '/memos?category=8' },
      { name: 'ダブルス', href: '/memos?category=9' },
      { name: 'グッズ', href: '/memos?category=10' },
      { name: 'その他', href: '/memos?category=99' },
    ],
  },
  {
    name: 'Tags',
    icon: FolderIcon,
    current: false,
    children: [
      { name: 'Overview', href: '#' },
      { name: 'Members', href: '#' },
      { name: 'Calendar', href: '#' },
      { name: 'Settings', href: '#' },
    ],
  },
  // {
  //   name: 'Todos',
  //   icon: InboxIcon,
  //   current: false,
  //   href: '/settings/profile',
  //   children: [
  //     { name: 'Overview', href: '#' },
  //     { name: 'テニススタイル', href: '/settings/play-style' },
  //     { name: 'Calendar', href: '#' },
  //     { name: 'Settings', href: '#' },
  //   ],
  // },
  // {
  //   name: 'Calendar',
  //   icon: CalendarIcon,
  //   current: false,
  //   children: [
  //     { name: 'Overview', href: '#' },
  //     { name: 'Members', href: '#' },
  //     { name: 'Calendar', href: '#' },
  //     { name: 'Settings', href: '#' },
  //   ],
  // },
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
