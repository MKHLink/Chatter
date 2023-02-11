import React from 'react';
import { Button, Form, Input } from 'antd';
import { Col, Row } from 'antd';

const SignUp =()=>{
    return(
        <div style={{marginTop:50}}>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
        <Form labelCol={{
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
    
    autoComplete="off">
            <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Passwords">
            <Input.Password />
          </Form.Item>

         <Form.Item wrapperCol={{
        offset: 8,
        span: 16,
      }}>
         <Button type="primary" htmlType="submit">
        Signup
      </Button>
      <p>Already have an account with us? Login <a href='/'>here</a></p>
         </Form.Item>
        </Form>
        </Col>
        </Row>
        </div>
    );
};

export default SignUp;