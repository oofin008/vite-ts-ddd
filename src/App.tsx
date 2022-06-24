import React from 'react';
import './App.css'
import Defaultlayout from './templates/antd/Default'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { RoutesInterface } from './routes/routes';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Defaultlayout />}>
          {routes.map((route: RoutesInterface, i: number) => {
            return (
              route.path ?
              <Route key={i} path={route.path} element={route.element} /> 
              : <Route key={i} index element={route.element}/>
            )
            })
          }
        </Route>
      </Routes>
    </Router>
  )
}

export default App
