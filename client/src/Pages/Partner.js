import React,{useState} from "react";
import { useQuery } from "@apollo/client";
import { Col, Row } from 'antd';

import { QUERY_USER } from "../utils/queries";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const Partner =()=>{
    const [formState, setFormState] = useState({username:''});
    const {loading, data} = useQuery(QUERY_USER);
    

    return(
        <main>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>

                <form>
                    <lable for="userName">Username</lable>
                    <input type="text" id="userName"></input>
                    <button type="submit">Search</button>
                </form>

            </Col>
        </Row>
        </main>
    );
};

export default Partner;