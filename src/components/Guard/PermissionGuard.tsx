import React, { useContext } from 'react'
import { Spin } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import { ALL_ROLES, AuthContext } from '@/core/types/authentication';
import { Permission, PermissionGuardProps } from './type';
import { Navigate } from 'react-router-dom';

const roleComparer = (role: string | undefined, permission: Permission) => {

  if(permission === Permission["PUBLIC"]) {
    return true;
  }
  if (role === undefined) {
    return false;
  }
  if (role === "admin") {
    return true;
  }
  if (role === "user" && permission !== Permission["ADMIN"]) {
    return true;
  }
  return false;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = (props) => {
  const [state] = useContext<AuthContext>(AuthMachineContext);

  const { permission } = props;

  return (
    <>
      {state.hasTag('loading') && <Spin tip='Loading...' />}
      {state.matches('loggedIn') && (roleComparer(state.context.role, permission) ?
        <div>
          {props.children}
        </div>
        : <Navigate to='/nopermission' />
      )}
      {state.matches('loggedOut') && (permission !== Permission["PUBLIC"] ?
        <div>You are not login, please login to access this content.</div>
        : <div>
          {props.children}
        </div>
      )}
    </>
  )
}
