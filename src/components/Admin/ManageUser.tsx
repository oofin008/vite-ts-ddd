import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import { ListUsersResponse } from '@/core/domains/admin/firebaseAdminRepo';
import { User } from 'firebase/auth';
import { DataType, TableParams, columnsConfig } from './ColumnConfig';

function toTableData(data: User[]): DataType[] {
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

// add loading

const ManageUser = () => {
  const effectControl = useRef(false);
  const [data, setData] = useState<DataType[]>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    }
  })

  const fetchUser = async (pageNum: number | undefined) => {

    const res = await firebaseAdminImpl.listUsers({limit: tableParams.pagination?.pageSize || 10, page: pageNum ?? 1});
    if (!res) {
      return;
    }

    const { response, total } = res as ListUsersResponse;
    const sanitizeData = toTableData(response);
    setData(sanitizeData);

    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total,
        current: pageNum,
      }
    })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<DataType>[],
  ) => {

    fetchUser(pagination.current);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }

  }

  useEffect(() => {
    if(effectControl.current === false) {
      fetchUser(1);
    }
    return () => {
      effectControl.current = true;
    }
  }, []);

  return (
    <div>
      <h1>ManageUser</h1>
      <Table
        columns={columnsConfig}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default ManageUser