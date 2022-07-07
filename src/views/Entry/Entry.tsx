import React, { useContext } from 'react'
import Login from './Login'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { Button } from 'antd';
import './entry.css';

const Entry = () => {
  const [ state, send, service ] = useContext(AuthMachineContext);
  console.log(service);
  return (
    <div className='entry-frame'>
      <Login/>
      <Button onClick={() => send("REPORT_IS_LOGGED_IN")}> Report loggin</Button>
      <p>{state.value}</p>
    </div>
  )
}

export default Entry