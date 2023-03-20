import React,{useState} from 'react';
import {useMutation} from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import { Col, Row } from 'antd';

  
const Login = ()=>{

   const [formState, setFormState] = useState({email: '', password: ''});
   const [userLogin, {error}] = useMutation(LOGIN_USER);

   const handleChange = (event)=>{
    const {name, value} = event.target;
  
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleFormSubmit = async event =>{
    event.preventDefault();
    
    try{
      const {data} = await userLogin(
        {
          variables: {...formState}
        }
        
      );
      console.log(data);
      Auth.login(data.userLogin.token);
    }catch(e){
      console.log(e);
    }
  };
    
    return(
        <div style={{marginTop:50}}>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
            {/* <Form 
            onSubmit={handleFormSubmit}
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
      
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input name="email" type="email" value={formState.email} onChange={handleChange}/>
    </Form.Item>

    <Form.Item
      label="Password"
      
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password name="password" type="password" value={formState.password} onChange={handleChange}/>
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
      <Button type="primary" htmlType="submit" onSubmit={handleFormSubmit}>
        Submit
      </Button>
      <p>Don't have an account? Register <a href='/signup'>here</a></p>
    </Form.Item>
  </Form> */}

<form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>

            <p>Don't have an account? Register <a href='/signup'>here</a></p>
  {error && <div>Login Failed</div>}
            </Col>
            </Row>
        </div>
    );
};

export default Login;