import React, { useContext, useEffect } from 'react'
import Login from './Login'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { Button } from 'antd';
import './entry.css';
import { PermissionGuard } from '@/components/Guard/PermissionGuard';
import { IfLogout } from '@/components/Guard';

const Entry = (props: any) => {
  const [state, send, service] = useContext(AuthMachineContext);
  // console.log('state: =========', state);
  // console.log('service: =========', service);

  return (
    <div className='entry-frame'>
      <Login />
      {/* <IfLogout>
      </IfLogout> */}
      <PermissionGuard>
        <Button onClick={() => send("LOG_OUT")}> LogOut</Button>
        <Button onClick={() => {console.log(state.context)}}>Log Xstate Context</Button>
        <p>{state.value}</p>
      </PermissionGuard>
    </div>
  )
}

export default Entry