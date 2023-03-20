import React from 'react';
import { Col, Row } from 'antd';

const Footer =()=>{
    return(
        <footer>
            <Row>
                <Col span={6}>Dates</Col>
                <Col span={6}>Notes</Col>
                <Col span={6}>Me</Col>
                <Col span={6}>Partner</Col>
            </Row>
        </footer>
    );
};

export default Footer;