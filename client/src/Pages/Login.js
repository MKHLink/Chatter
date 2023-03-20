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