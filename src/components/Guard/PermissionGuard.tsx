import React, { useContext, useEffect, useState } from 'react'
import { Alert, Spin } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'

export const PermissionGuard = (props: any) => {
  const [state, send, service] = useContext(AuthMachineContext);
  const { isLoginError } = state.context;
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if(
      state.matches('checkingIfLoggedIn') ||
      state.matches('loggingIn') ||
      state.matches('loggingOut')
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [state]);

  return (
    <>
      {isLoading && <Spin tip='Loading...' />}
      {state.matches('loggedIn') &&
        <div>{props.children}</div>
      }
      {state.matches('loggedOut') &&
        <div>You have been logged out, please re-loggin to access this content.</div>
      }
      {isLoginError && <Alert type="error" message="Login Error" banner closable/>}
    </>
  )
}
