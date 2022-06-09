import React from 'react';
// import react-router-dom v6
import { Routes, Route } from 'react-router-dom';
import routes from '../routes';
import { RoutesInterface } from '../routes/routes';
import Navbar from './Navbar';

const Defaultlayout = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
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
  )
}

export default Defaultlayout;