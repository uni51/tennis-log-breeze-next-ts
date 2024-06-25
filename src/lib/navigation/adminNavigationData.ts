// navigationData.ts
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  InboxIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const adminNavigation = [
  { name: 'Dashboard', icon: HomeIcon, current: true, href: '/admin/dashboard' },
  {
    name: 'Memos',
    icon: UsersIcon,
    current: false,
    children: [
      { name: 'メモ一覧', href: '/admin/memos' },
      { name: 'レビュー待ちメモ一覧', href: '/admin/memos/waiting/review' },
      { name: '修正依頼中メモ一覧', href: '/admin/memos/waiting/fix' },
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
  // {
  //   name: 'Projects',
  //   icon: FolderIcon,
  //   current: false,
  //   children: [
  //     { name: 'Overview', href: '#' },
  //     { name: 'Members', href: '#' },
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
    name: 'Users',
    icon: InboxIcon,
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
