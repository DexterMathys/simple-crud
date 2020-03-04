import React from 'react'
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = props => {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (text, record) => (
            <span>
                <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => {
                        props.editRow(record)
                    }}
                    className="button muted-button"
                >
                </Button>
                <Button type="link" icon={<DeleteOutlined />} danger onClick={() => props.deleteUser(record.id)} className="button muted-button">
                </Button>
            </span>
          ),
        },
      ]

    return (
        <Table 
            dataSource={props.users} 
            columns={columns}
            rowKey={record => record.id}
        >
        </Table>
    )
}

export default UserTable