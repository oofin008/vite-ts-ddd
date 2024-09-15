import React, { Suspense, useContext } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Col, Row, Dropdown, Button, Spin, MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine';
import './default.less';


// Layout is defined here, 
// Navbar, Sidebar, Main, Footer should be here
const Defaultlayout = () => {
  const [state, send, service] = useContext(AuthMachineContext);
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const navigate = useNavigate();

  const onClickMenu: MenuProps['onClick'] = ({ key }) => {
    if(key === 'LOG_OUT') {
      send(key);
      navigate('/');
    } else {
      navigate(`/${key}`);
    }
  }

  const menuItems: MenuProps['items'] = [
    { key: 'admin', label: 'Dashboard' },
    { key: 'LOG_OUT', label: 'Log Out' },
  ];

  return (
    <Layout className='layout'>
      {/* NAV MENU */}
      <Header className='header'>
        <Row>
          <Col lg={4} md={5} sm={0} xs={0}><div className='logo' /></Col>
          <Col lg={16} md={14} sm={12} xs={12}>
            {/* TODO: Dynamic menu */}
            <Menu
              className='menu'
              theme='dark'
              mode='horizontal'
              items={[
                { key: '/', label: (<Link to="/">Home</Link>) },
                { key: '/about', label: (<Link to="/about">About</Link>) },
                { key: '/contact', label: (<Link to="/contact">Contact</Link>) },
              ]}
              selectedKeys={[location.pathname]}
            />
          </Col>
          <Col lg={4} md={5} sm={12} xs={12} className='avatar-group'>
            {/* TODO: create utils for state resolver ex. <AuthMatches logout={<Component/>} logIn={<Comp/>} */}

              {
                state.matches('loggedOut') &&
                <Button ghost href='/entry' icon={<UserOutlined />}>Log In</Button>
              }
              {
                state.matches('loggedIn') &&
                <Dropdown menu={{items: menuItems, onClick: onClickMenu }} className=''>
                  <Button shape='circle' ghost icon={<UserOutlined />}></Button>
                </Dropdown>
              }
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '50px 50px' }}>
        {/* Wrap Outlet inside suspense for lazy loading page views */}
        <Suspense fallback={<Spin tip='Loading...' />}>
          <Outlet />
        </Suspense>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Santi Personal dashboard
      </Footer>
    </Layout>
  )
}

export default Defaultlayout;