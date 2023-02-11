import React from 'react';


  import { Col, Row } from 'antd';
  import { Button, Checkbox, Form, Input } from 'antd';

  

const Login = ()=>{

   

    return(
        <div style={{marginTop:50}}>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
            <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
      <p>Don't have an account? Register <a href='/signup'>here</a></p>
    </Form.Item>
  </Form>

            
            </Col>
            </Row>
        </div>
    );
};

export default Login;