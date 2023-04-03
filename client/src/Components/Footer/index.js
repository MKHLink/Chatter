import React from 'react';
import { Col, Row } from 'antd';
import {CalendarOutlined,FileTextOutlined,UserOutlined,HeartOutlined} from '@ant-design/icons';

import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

const Footer =()=>{
    return(
        <footer>
            <Row>
                <Col span={6}>Dates <CalendarOutlined /></Col>
                <Col span={6}>Notes <FileTextOutlined /></Col>
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