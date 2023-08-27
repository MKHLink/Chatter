import React, {useState} from 'react';
import { Col, Row, Modal, Form, Button, Input } from 'antd';
import {CalendarOutlined,FileTextOutlined,UserOutlined,HeartOutlined} from '@ant-design/icons';

import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

import { CREATE_MSG } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const Footer =()=>{
    const [isModalV, setModalV] = useState(false);
    const [createNote] = useMutation(CREATE_MSG);

    const showModal = ()=>{
        setModalV(true);
    };

    const handleCancle=()=>{
        setModalV(false);
    };

    const handleFormSubmit= async (values)=>{
        try{
            await createNote({
                variables:{
                    text: values.note,
                }
            });
        console.log(values);
        setModalV(false);
        }catch(error){
            console.log(error)
        }
    };

    return(
        <footer>
            <Row>
                <Col span={6}>
                    <Link to="/landingpage">Dates <CalendarOutlined /></Link>
                </Col>
                <Col span={6}><span onClick={showModal} style={{cursor:'pointer'}}>
                Notes <FileTextOutlined />
                </span>
                <Modal title='Add Note' open={isModalV} onCancel={handleCancle} footer={null}>
                    <Form onFinish={handleFormSubmit}>
                    <Form.Item name="note" rules={[{ required: true, message: 'Please enter a note' }]}>
                <Input.TextArea placeholder="Enter your note here" rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
                    </Form>
                </Modal>
                </Col>
                <Col span={6}>
                    <Link to="/profile">Me <UserOutlined /></Link>
                </Col>
                <Col span={6}>
                    <Link to="/partner">Partner <HeartOutlined /></Link>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;