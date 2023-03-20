import React,{useState} from 'react';
import { Col, Row } from 'antd';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignUp =()=>{

    const [formState, setFormState] = useState({email: '', username: '', password:''});
    const [addUser, {error}] = useMutation(ADD_USER);

    const handleChange =(event)=>{
      const {name, value} = event.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    }

    const handleFormSubmit= async event =>{
      event.preventDefault();

      try{  
        const {data} = await addUser(
          {
            variables: {...formState}
          }
        );
        console.log(data);
        Auth.login(data.addUser.token);
      }catch(error){
        console.log(error);
      }
    }

    return(
        <div style={{marginTop:50}}>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>


<form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />

              <input
                className='form-input'
                placeholder='Username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
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

            <p>Already have an account with us? Login <a href='/'>here</a></p>
            {error && <div>Login Failed</div>}
        </Col>
        </Row>
        </div>
    );
};

export default SignUp;