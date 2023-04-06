import React, { useContext } from 'react'
import { Alert, Spin } from 'antd'
import { Navigate } from 'react-router-dom';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { AuthContext } from '@/core/types/authentication';
import { Permission, PermissionGuardProps } from './type';

export const PermissionGuard: React.FC<PermissionGuardProps> = (props) => {
  const [state, send, service] = useContext<AuthContext>(AuthMachineContext);
  const { permission } = props;
  // const { isLoginError } = state.context;

  // switch (permission) {
  //   case Permission["ADMIN"]:
  //     if(!state.hasTag('admin')) {
  //       console.log('===== YES')
  //       return <Navigate to="/" replace={true}/>
  //     }
  //     break;
  //   default:
  //     console.log('default');
  //     return <Navigate to="/entry" replace={true} />
  // }
  return (
    <>
      {state.hasTag('loading') && <Spin tip='Loading...' />}
      {state.matches('loggedIn') &&
        <div>{props.children}</div>
      }
      {state.matches('loggedOut') &&
        <div>You have been logged out, please re-loggin to access this content.</div>
      }
      {/* {isLoginError && <Alert type="error" message="Login Error" banner closable/>} */}
    </>
  )
}
