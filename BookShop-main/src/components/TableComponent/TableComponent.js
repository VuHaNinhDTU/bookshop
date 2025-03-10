import React, { useState } from 'react'
import { Divider, Radio, Table } from 'antd';

const TableComponent = (props) => {
    const { setSelectionType = 'checkbox' } = props

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Wick',
            age: 32,
            address: 'New York No.1 Lake Park',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    return (
        <Table
            rowSelection={{
                type: setSelectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
        />
    )
}

export default TableComponent