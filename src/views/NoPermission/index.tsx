import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NoPermission = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}
    />
  )
}

export default NoPermission;
