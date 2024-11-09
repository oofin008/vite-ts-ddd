import React, { useState } from 'react'
import { ManageUser } from '@/components/Admin'
import { Button, Modal } from 'antd'
import AddUserForm, { CreateUserFields } from '@/components/Admin/AddUserFormModal'
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl'

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateUser = async (values: CreateUserFields) => {
    console.log('values: ', values);
    // firebaseAdminImpl.createUser(values)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div>
        <div>Admin</div>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
        <AddUserForm visible={isModalOpen} setVisible={setIsModalOpen} onCreate={handleCreateUser} />
      </div>
      <ManageUser />
    </>
  )
}

export default Admin