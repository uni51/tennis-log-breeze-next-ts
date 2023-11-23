import { PropsWithChildren, ReactNode } from 'react'
import AdminNavigation from '@/components/Layouts/Admin/AdminNavigation'
import { Admin } from '@/hooks/adminAuth'
import { useAdminAuthQuery } from '@/hooks/adminAuthQuery'

interface Props {
  header: ReactNode
}

const AdminAppLayout = ({ header, children }: PropsWithChildren<Props>) => {
  const { admin } = useAdminAuthQuery({ middleware: 'adminAuth' })

  return (
    <div className='min-h-screen bg-gray-100'>
      <AdminNavigation admin={admin} />

      {/* Page Heading */}
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>{header}</div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}

export default AdminAppLayout
