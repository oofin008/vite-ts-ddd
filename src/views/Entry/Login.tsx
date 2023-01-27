import React, { useContext, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { firebaseAuthImpl } from '@/core/domains/auth/firebaseAuthImpl';
import './login.css';
import { AuthMachineContext } from '@/core/presentation/auth/authMachine';
import { SignInParams } from '@/core/domains/auth/firebaseAuthRepo';

const Login = () => {
  const [ state, send, service ] = useContext(AuthMachineContext)

  const onFinish = async (values: any) => {
    try {
      const signInParams: SignInParams = {
        email: values.username,
        password: values.password,
        isRememberMe: values.remember ?? false,
      }
      send({type:'LOG_IN', data: {signInParams}});
    } catch (error) {
      console.log('catch error here');
      console.error(error);
      send('LOGIN_FAIL')
    }
    // setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('===== ON finish Failed:', errorInfo);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" autoComplete='username'/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          autoComplete='current-password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={state.hasTag("loading")}>
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  )
}

export default Login