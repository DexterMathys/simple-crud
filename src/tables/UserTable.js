import React from 'react'
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserTable = props => {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
          align: 'center',
        },
        {
          title: 'Actions',
          key: 'actions',
          align: 'center',
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
        // <table>
        //     <thead>
        //         <tr>
        //             <th>Name</th>
        //             <th>Username</th>
        //             <th>Actions</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {props.users.length > 0 ? (
        //             props.users.map(user => (
        //                 <tr key={user.id}>
        //                     <td>{user.name}</td>
        //                     <td>{user.username}</td>
        //                     <td>
        //                         <button
        //                             onClick={() => {
        //                                 props.editRow(user)
        //                             }}
        //                             className="button muted-button"
        //                         >
        //                             Edit
        //                         </button>
        //                         <button onClick={() => props.deleteUser(user.id)} className="button muted-button">
        //                             Delete
        //                         </button>
        //                     </td>
        //                 </tr>
        //             ))
        //         ) : (
        //             <tr>
        //                 <td colSpan={3}>No users</td>
        //             </tr>
        //         )}
        //     </tbody>
        // </table>

        <Table 
            dataSource={props.users} 
            columns={columns}
            rowKey={record => record.id}
        >
        </Table>
    )
}

export default UserTable