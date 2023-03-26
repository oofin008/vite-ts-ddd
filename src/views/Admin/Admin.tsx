import React from 'react'
import { ManageUser } from '@/components/Admin'
import { PermissionGuard } from '@/components/Guard'

const Admin = () => {
  return (
    <>
      <PermissionGuard>
        <div>Admin</div>
        <ManageUser />
      </PermissionGuard>
    </>
  )
}

export default Admin