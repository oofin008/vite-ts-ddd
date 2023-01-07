import { AuthMachineContext } from '@/core/presentation/auth/authMachine'
import React, { useContext} from 'react'


export const IfLogout = (props: any) => {
  const [state, send, service] = useContext(AuthMachineContext);

  return (
    <>
      {state.matches('loggedOut') &&
        <div>{props.children}</div>
      }
    </>
  )
}
