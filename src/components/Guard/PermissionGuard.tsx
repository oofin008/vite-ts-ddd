import React, { Suspense, useContext, useEffect } from 'react'
import { Alert, Spin } from 'antd'
import { Navigate } from 'react-router-dom';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { ALL_ROLES, AuthContext } from '@/core/types/authentication';
import { Permission, PermissionGuardProps } from './type';

const roleComparer = (role: string | undefined, permission: Permission) => {
  let isAbleToAccess = false;
  if (role === undefined) {
    return false;
  }
  if (role === "admin" || permission === Permission["PUBLIC"]) {
    isAbleToAccess = true;
  }
  if (role === "user" && permission !== Permission["ADMIN"]) {
    isAbleToAccess = true;
  }
  if (!ALL_ROLES.includes(role)) {
    isAbleToAccess = false;
  }
  return isAbleToAccess;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = (props) => {
  const [state, send, service] = useContext<AuthContext>(AuthMachineContext);

  const { permission } = props;

  return (
    <>
      {state.hasTag('loading') && <Spin tip='Loading...' />}
      {state.matches('loggedIn') && (roleComparer(state.context.role, permission) ?
        <Suspense fallback={<Spin tip='loading...' />}>
          {props.children}
        </Suspense>
        : <div>You are not authorized to access this content.</div>
      )}
      {state.matches('loggedOut') && (permission !== Permission["PUBLIC"] ?
        <div>You are not login, please login to access this content.</div>
        : <Suspense fallback={<Spin tip='loading...' />}>
          {props.children}
        </Suspense>
      )}
      {/* {isLoginError && <Alert type="error" message="Login Error" banner closable/>} */}
    </>
  )
}
