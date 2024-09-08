import React, { useContext } from 'react'
import Login from './Login'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { Button } from 'antd';
import './entry.css';

const Entry = (props: any) => {
  const [state, send, service] = useContext(AuthMachineContext);
  // console.log('state: =========', state);
  // console.log('service: =========', service);

  return (
    <div className='entry-frame'>
      <Login />
        <Button onClick={() => {console.log(state.context)}}>Log Xstate Context</Button>
        <p>{state.value}</p>
        <p>{JSON.stringify(state.context)}</p>
    </div>
  )
}

export default Entry