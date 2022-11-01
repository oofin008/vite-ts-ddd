import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, Avatar, Col, Row, Dropdown, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine';
import UserMenu from './UserMenu';
import './default.css';


// Layout is defined here, 
// Navbar, Sidebar, Main, Footer should be here
const Defaultlayout = () => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();
  const [state, send, service] = useContext(AuthMachineContext);

  return (
    <Layout className='layout'>
      {/* NAV MENU */}
      <Header className='header'>
        <Row>
          <Col lg={4} md={5} sm={0} xs={0}><div className='logo' /></Col>
          <Col lg={16} md={14} sm={0} xs={0}>
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
          <Col lg={4} md={5} sm={24} xs={24}>
            {/* TODO: create utils for state resolver ex. <AuthMatches logout={<Component/>} logIn={<Comp/>} */}
            <div className='avatar-group'>
              {
                state.matches('loggedOut') &&
                <Button ghost href='/entry' icon={<UserOutlined />}>Log In</Button>
              }
              {
                state.matches('loggedIn') &&
                <Dropdown overlay={<UserMenu/>}>
                  <Button shape='circle' ghost icon={<UserOutlined />}></Button>
                </Dropdown>
              }
            </div>
          </Col>
        </Row>
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div className='site-layout-content'>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default Defaultlayout;