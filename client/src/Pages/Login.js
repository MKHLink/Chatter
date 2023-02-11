import React from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
  } from '@chakra-ui/react';

  import { Col, Row } from 'antd';

const Login = ()=>{

    return(
        <div>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>
            <h1>Login</h1>

            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type='email' />
                <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
            </FormControl>

            <p>Don't have an account? Register <a href='#'>here</a></p>
            </Col>
            </Row>
        </div>
    );
};

export default Login;