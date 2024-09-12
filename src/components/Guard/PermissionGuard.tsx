import React, { Suspense, useContext } from 'react'
import { Alert, Spin } from 'antd'
import { Navigate } from 'react-router-dom';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { AuthContext } from '@/core/types/authentication';
import { Permission, PermissionGuardProps } from './type';

export const PermissionGuard: React.FC<PermissionGuardProps> = (props) => {
  const [state, send, service] = useContext<AuthContext>(AuthMachineContext);
  const { permission } = props;
  // const { isLoginError } = state.context;

  switch (permission) {
    case Permission["PUBLIC"]:
      return (<Suspense fallback={<Spin tip='loading...' />}>
        {props.children}
      </Suspense>);
    case Permission["USER"]:
    case Permission["ADMIN"]:
    default:
      return (
        <>
          {state.hasTag('loading') && <Spin tip='Loading...' />}
          {state.matches('loggedIn') &&
            <Suspense fallback={<Spin tip='loading...' />}>
              {props.children}
            </Suspense>
          }
          {state.matches('loggedOut') &&
            <div>You are not login, please login to access this content.</div>
          }
          {/* {isLoginError && <Alert type="error" message="Login Error" banner closable/>} */}
        </>
      )
  }
}
