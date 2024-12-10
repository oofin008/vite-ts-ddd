import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';

const ExpenseForm: React.FC = () => {
  const onFinish = (values: any) => {
    // Add your logic to handle the form submission here
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="amount" label="Amount">
        <Input type="number" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input />
      </Form.Item>
      <Form.Item name="tags" label="Tags">
        <Input />
      </Form.Item>
      <Form.Item name="date" label="Date">
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;