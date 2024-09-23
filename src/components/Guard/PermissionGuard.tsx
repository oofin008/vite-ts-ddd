import React, { Suspense, useContext } from 'react'
import { Spin } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { ALL_ROLES, AuthContext } from '@/core/types/authentication';
import { Permission, PermissionGuardProps } from './type';
import { Navigate } from 'react-router-dom';

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
  const [state] = useContext<AuthContext>(AuthMachineContext);

  const { permission } = props;

  return (
    <>
      {state.hasTag('loading') && <Spin tip='Loading...' />}
      {state.matches('loggedIn') && (roleComparer(state.context.role, permission) ?
        <Suspense fallback={<Spin tip='loading...' />}>
          {props.children}
        </Suspense>
        : <Navigate to='/nopermission' />
      )}
      {state.matches('loggedOut') && (permission !== Permission["PUBLIC"] ?
        <div>You are not login, please login to access this content.</div>
        : <Suspense fallback={<Spin tip='loading...' />}>
          {props.children}
        </Suspense>
      )}
    </>
  )
}
