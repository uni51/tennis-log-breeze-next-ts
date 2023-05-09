import { ReactNode } from 'react'
import AdminNavigation from './AdminNavigation'
import { useAdminAuth } from 'hooks/adminAuth'

const AdminAppLayout = ({
  header,
  children,
}: {
  header: ReactNode
  children: ReactNode
}) => {
  const { admin } = useAdminAuth({ middleware: 'adminAuth' })

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation user={admin} />

      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  )
}

export default AdminAppLayout
