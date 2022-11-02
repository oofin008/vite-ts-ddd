import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// TODO: Known issue, xstate.init called twice if enable React.StrictMode
// this issue will not be on production, only dev env
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
)
