import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PaginationType } from 'antd/lib/transfer/interface';

interface DataType {
  key: string;
  name: string;
  email: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Add Permission</a>
        <a>Remove Permission</a>
        <a>Delete User</a>
      </Space>
    ),
  },
];

const paginationConfig: PaginationType = {
  pageSize: 1,
};

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'abc@yahoo.com',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    email: '123@gg.com',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    email: 'Wowza123@gman.com',
    tags: ['cool', 'teacher'],
  },
];


const ManageUser = () => {
  return (
    <div>
      <h1>ManageUser</h1>
      <Table columns={columns} dataSource={data} pagination={paginationConfig} />
    </div>
  )
}

export default ManageUser