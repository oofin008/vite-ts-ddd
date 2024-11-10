import React, { useState } from 'react';
import { Form, Input, Modal, notification, Select } from 'antd';
import { CreateUserParams } from '@/core/domains/admin/firebaseAdminRepo';

interface AddUserFormProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreate: (values: CreateUserFields) => Promise<void>;
}

export type CreateUserFields = CreateUserParams;

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
      await onCreate(values);
      setIsLoading(false);
      form.resetFields();
      setVisible(false);
    } catch (err) {
      console.error('[Error] create user failed: ', err);
      notification.error({
        message: 'Add User Error',
        description: `${(err as Error).message}`,
        placement: 'topRight',
      });
      setIsLoading(false);
    }


  };

  return (
    <Modal
      title="Create new user"
      okText="Create"
      open={visible}
      onOk={handleSubmit}
      okButtonProps={{ disabled: shouldButtonDisabled }}
      onCancel={() => setVisible(false)}
      confirmLoading={isLoading}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your email!' }]}
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
