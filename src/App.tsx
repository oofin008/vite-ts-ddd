import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMachine } from '@xstate/react';
import { authenticationMachine, AuthMachineContext } from './core/presentation/auth/authMachine';
import Defaultlayout from './templates/antd/Default'
import routes from './routes';
import { RoutesInterface } from './routes/routes';

function App() {
  const [state, send, service] = useMachine(authenticationMachine);
  const authMachine = [state, send, service];

  return (
    <AuthMachineContext.Provider value={authMachine}>
      <Router>
        <Routes>
          <Route path="/" element={<Defaultlayout />}>
            {routes.map((route: RoutesInterface, i: number) => {
              return (
                route.path ?
                  <Route key={i} path={route.path} element={route.element} />
                  : <Route key={i} index element={route.element} />
              )
            })
            }
          </Route>
        </Routes>
      </Router>
    </AuthMachineContext.Provider>
  )
}

export default App
