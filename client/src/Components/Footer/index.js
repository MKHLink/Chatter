import React from 'react';
import { Col, Row } from 'antd';
import {CalendarOutlined,FileTextOutlined,UserOutlined,HeartOutlined} from '@ant-design/icons';

const Footer =()=>{
    return(
        <footer>
            <Row>
                <Col span={6}>Dates <CalendarOutlined /></Col>
                <Col span={6}>Notes <FileTextOutlined /></Col>
                <Col span={6}>Me <UserOutlined /></Col>
                <Col span={6}>Partner <HeartOutlined /></Col>
            </Row>
        </footer>
    );
};

export default Footer;