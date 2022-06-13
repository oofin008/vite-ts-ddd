import React from 'react';
import './App.css'
import Defaultlayout from './templates/Default'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import { RoutesInterface } from './routes/routes';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Defaultlayout />}>
          {routes.map((route: RoutesInterface) => {
            return (
              route.path ?
              <Route path={route.path} element={route.element} /> 
              : <Route index element={route.element}/>
            )
            })
          }
        </Route>
      </Routes>
    </Router>
  )
}

export default App
