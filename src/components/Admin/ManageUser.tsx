import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import { ListUsersResponse } from '@/core/domains/admin/firebaseAdminRepo';
import { User } from 'firebase/auth';

interface DataType {
  id: number;
  name: string | null;
  email: string | null;
  tags: string[];
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
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

function toTableData(data: User[]): DataType[] {
  console.log('toTableData: ', data);
  if (!data) {
    return [];
  }
  return data.map((user, index) => {
    return {
      id: index,
      name: user.displayName,
      email: user.email,
      tags: ['user'],
    }
  })
}

const ManageUser = () => {
  const effectControl = useRef(false);
  const [data, setData] = useState<DataType[]>();
  const [nextPage, setNextPage] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    }
  })

  const fetchUser = async () => {

    const res = await firebaseAdminImpl.listUsers({limit: tableParams.pagination?.pageSize || 10, nextPageToken: nextPage});
    if (!res) {
      return;
    }
    console.log('fetch user: ', res);
    const { response, nextPageToken, total } = res as ListUsersResponse;
    const sanitizeData = toTableData(response);
    setData(sanitizeData);
    if (nextPageToken) {
      setNextPage(nextPageToken)
    }
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total,
      }
    })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
  ) => {
    console.log('on page change ==>', pagination);

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }

  }

  useEffect(() => {
    console.log('use effect run', effectControl);
    if(effectControl.current === false) {
      fetchUser();
    }
    return () => {
      effectControl.current = true;
    }

  }, [JSON.stringify(tableParams)]);

  return (
    <div>
      <h1>ManageUser</h1>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default ManageUser