import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 The page you try to access cannot be founded</h1>
      <Link to="/">Go to Home</Link>
    </div>
  )
}

export default NotFound;