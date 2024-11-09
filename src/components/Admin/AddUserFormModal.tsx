import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import { Role } from '@/core/types/authentication';

interface AddUserFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreate: (values: CreateUserFields) => void;
}

export interface CreateUserFields {
  username: string;
  email: string;
  role: Role;
}

const AddUserForm: React.FC<AddUserFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldButtonDisabled, setButtonDisabled] = useState(false);
  const [form] = Form.useForm<CreateUserFields>();
  const { visible, setVisible, onCreate } = props

  const handleSubmit = async () => {
    // firebaseAdminImpl.createUser(values.username, values.email);
    setIsLoading(true)
    try {
      const values = await form.validateFields()
      console.log('values: ', values);
      onCreate(values);
    } catch (err) {
      console.error('[Error] create user failed: ', err);
    }
    
    setIsLoading(false);
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title="Create new user"
      okText="Create"
      open={visible}
      onOk={handleSubmit}
      okButtonProps={{disabled: shouldButtonDisabled}}
      onCancel={() => setVisible(false)}
      confirmLoading={isLoading}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="moderator">Moderator</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserForm;
