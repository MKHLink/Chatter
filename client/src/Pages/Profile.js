import React from 'react';
import Footer from '../Components/Footer';
import { QUERY_ME } from '../utils/queries';
import auth from '../utils/auth';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useQuery } from '@apollo/client';
const { Meta } = Card;

const Profile =()=>{

    const {loading, data} = useQuery(QUERY_ME);

    const user = data?.me || {};
    console.log(user);

  
    return(
        <main className='profile'>
            
            <Card cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <button onClick={auth.logout}>Sign Out</button>,
      ]}
    >
   <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title={user.username}
      description={user.email}
    />
    
  </Card>

            <Footer></Footer>
        </main>
    );
};

export default Profile;