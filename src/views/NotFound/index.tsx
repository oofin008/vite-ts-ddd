import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visit doesn't exist."
      extra={<Button type='primary'><Link to="/">Back Home</Link></Button>}
    />
  )
}

export default NotFound;