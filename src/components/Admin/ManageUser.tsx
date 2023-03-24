import React, { useEffect, useRef, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { firebaseAdminImpl } from '@/core/domains/admin/firebaseAdminImpl';
import { ListUsersResponse } from '@/core/domains/admin/firebaseAdminRepo';
import { User } from 'firebase/auth';
import { DataType, TableParams, columnsConfig } from './ColumnConfig';

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

// try useCallback to solve useEffect called twice issue

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