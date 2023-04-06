import React from 'react'
import { ManageUser } from '@/components/Admin'
import { PermissionGuard } from '@/components/Guard'
import { Permission } from '@/components/Guard/type'

const Admin = () => {
  return (
    <>
      <PermissionGuard permission={Permission.ADMIN}>
        <div>Admin</div>
        <ManageUser />
      </PermissionGuard>
    </>
  )
}

export default Admin