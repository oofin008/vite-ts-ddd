import React, { useContext } from 'react'
import { Menu } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [state, send, service] = useContext(AuthMachineContext);
  const navigate = useNavigate();

  const handleOnClick = ({ key }: any) => {
    if(key === 'LOG_OUT') {
      send(key);
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
  }

  return (
    <Menu
      items={[
        { key: 'admin', label: 'Dashboard' },
        { key: 'LOG_OUT', label: 'Log Out' },
      ]}
      onClick={handleOnClick}
    />
  )
}

export default UserMenu