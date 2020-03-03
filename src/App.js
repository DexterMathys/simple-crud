import React, { useState } from 'react'
import { Layout, Row, Col, Modal, Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import UserTable from './tables/UserTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {

  const { Header, Content, Footer } = Layout;

  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Craig', username: 'siliconeidolon' },
    { id: 3, name: 'Ben', username: 'benisphere' },
  ]
  const initialFormState = { id: null, name: '', username: '' }

  // getters and setters
  const [users, setUsers] = useState(usersData)
  const [visible, setVisible] = useState(false)
  const [editing, setEditing] = useState(false)
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [form] = Form.useForm();

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)
    
    setUsers(users.filter(user => user.id !== id))
  }

  const editRow = user => {
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
    form.setFieldsValue({name: user.name, username: user.username})
    setEditing(true)
    setVisible(true)
  }

  const newRow = () => {
    setCurrentUser(initialFormState)
    form.setFieldsValue({name: initialFormState.name, username: initialFormState.username})
    setEditing(false)
    setVisible(true)
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  const handleOk = e => {
    console.log(e);
    if (editing) {
      updateUser(currentUser.id, currentUser)
    } else {
      addUser(currentUser)
    }

    setVisible(false)
    form.resetFields()
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
    form.resetFields()
  };

  const handleInputChange = event => {
    const { name, value } = event.target

    setCurrentUser({ ...currentUser, [name]: value })
    console.log(currentUser);
    
  }


  return (
    <Layout className="layout">
      <Header>
        <h1 className="header">Simple CRUD with Hooks</h1>
      </Header>
      <Content className="container">
          <Modal
            title={editing ? "Edit user" : "Add user"}
            visible={visible}
            onOk={() => {
              form
                .validateFields()
                .then(values => {
                  form.resetFields();
                  handleOk();
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
            onCancel={handleCancel}
          >

          <Form
            form={form}
            layout="vertical"
            name="userForm"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input the name of user!',
                },
              ]}
            >
              <Input name="name" onChange={handleInputChange} />
            </Form.Item>
            <Form.Item 
              name="username" 
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input the username of user!',
                },
              ]}
            >
              <Input name="username" onChange={handleInputChange} />
            </Form.Item>
          </Form>
          </Modal>
          <Row>
            <Col span={24}>
              <Row>
              <Col span={21}>
                <h2>View users</h2>
              </Col>
              <Col span={3}>
                <Button className="btn-add-user" onClick={newRow} type="primary" shape="round" icon={<PlusOutlined />}>
                  Add user
                </Button>
              </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
                </Col>
              </Row>
            </Col>
          </Row>
      </Content>
      <Footer className="footer">Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default App