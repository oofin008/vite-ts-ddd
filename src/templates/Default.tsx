import React from 'react';
import { Link, Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu } from 'antd'


// Layout is defined here, 
// Navbar, Sidebar, Main, Footer should be here
const Defaultlayout = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout className='layout'>

      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', label: (<Link to="/">Home</Link>) },
            { key: '2', label: (<Link to="/about">About</Link>) },
            { key: '3', label: (<Link to="/contact">Contact</Link>) },
          ]}
        />
      </Header>

      <Content style={{ padding: '0 50px' }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default Defaultlayout;