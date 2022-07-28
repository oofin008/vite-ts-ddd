import React, { useContext, useEffect } from 'react'
import { Spin } from 'antd'
import { AuthMachineContext } from '@/core/presentation/auth/authMachine'

// TODO: Rewrite, redesign Permission Guard
export const PermissionGuard = (props: any) => {
  const [state, send, service] = useContext(AuthMachineContext);

  return (
    <>
      {state.matches('loggedOut') ?
        <Spin tip="Loading...">
          {props.children}
        </Spin> :
        <div>{props.children}</div>
      }
    </>
  )
}
