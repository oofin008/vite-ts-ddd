import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Defaultlayout from './templates/Default'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Defaultlayout />
    </Router>
  )
}

export default App
