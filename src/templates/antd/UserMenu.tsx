import React, { useContext } from 'react'
import { Menu } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'

const UserMenu = () => {
  const [state, send, service] = useContext(AuthMachineContext);
  return (
    <Menu
      items={[
        { key: 'LOG_OUT', label: 'Log Out' },
      ]}
      onClick={({ key }) => {
        send(key);
      }}
    />
  )
}

export default UserMenu