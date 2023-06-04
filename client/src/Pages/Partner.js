import React,{useState} from "react";
import { useLazyQuery } from "@apollo/client";
import { Col, Row } from 'antd';

import { QUERY_USER } from "../utils/queries";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const Partner =()=>{
    const [username, setUsername] = useState('');
    
    const [getUser,{loading,error, data}] = useLazyQuery(QUERY_USER);

    const handleChange = (event)=>{
        setUsername(event.target.value);
      };

      const handleFormSubmit = (event) =>{
        event.preventDefault();

        getUser({variables:{username}});
      };
    
      const showUsers =()=>{
        if(loading)
        {
            return <p>Fetching users</p>
        }

        if(error)
        {
            return <p>Something went wrong {error.message}</p>
        }

        if(data && data.getUser)
        {
            console.log(data.getUser);
            return <main className='profile'>
            
            <Card cover={
            <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
                <SettingOutlined key="setting" />
                ]}
            >
        <Meta
            avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
            title={data.getUser.username}
            description={data.getUser.email}
            />
    
        </Card>
        </main>;
            
        }
        
      }

    return(
        <main>
            <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={8}>

                <form onSubmit={handleFormSubmit}>

                    <input type="text"
                        value={username} 
                        onChange={handleChange}>
                    </input>
                    <button type="submit">Search</button>
                </form>

                {showUsers()}
            </Col>
        </Row>
        </main>
    );
};

export default Partner;