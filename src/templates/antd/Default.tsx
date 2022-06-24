import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd'
import './default.css';


// Layout is defined here, 
// Navbar, Sidebar, Main, Footer should be here
const Defaultlayout = () => {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();

  return (
    <Layout className='layout'>

      <Header>
        <div className='logo' />
        <Menu
          className='menu-right'
          theme='dark'
          mode='horizontal'
          items={[
            { key: '/', label: (<Link to="/">Home</Link>) },
            { key: '/about', label: (<Link to="/about">About</Link>) },
            { key: '/contact', label: (<Link to="/contact">Contact</Link>) },
          ]}
          selectedKeys={[location.pathname]}
        />
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