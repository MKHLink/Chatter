import React,{useState} from "react";
import {useMutation, useQuery } from "@apollo/client";
import { Col, Row } from 'antd';
import Footer from '../Components/Footer';

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_PARTNER } from "../utils/mutations";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const Partner =()=>{
    //sets form state
    const [username, setUsername] = useState('');
    
    //query for getting users 
    const {loading,error, data, refetch} = useQuery(QUERY_USER,{
        fetchPolicy: "network-only",
    });

    const {loading:myloading, data:dataMe} = useQuery(QUERY_ME);
    const user = dataMe?.me || {};

    //mutaution to add a user
    const [addPartner] = useMutation(ADD_PARTNER);

    //form and changes handler functions
    const handleChange = (event)=>{
        setUsername(event.target.value);
      };

      const handleFormSubmit = (event) =>{
        event.preventDefault();

        if(username === user.username)
        {
            return <p>You are a rockstar!!</p>
        }

        refetch({username: username});
        
      };

      const handleAddPartner = (friendId)=>{
        addPartner({
            variables:{friendId},
        });
      };

      const resetSearch = () => {
        setUsername("");
        refetch({ username: "" });
      };

     

      const showFriend =()=>{
        if(!myloading && user.friends){
            return(
                <main>
                    <Card cover={
                <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
                }
                actions={[
                ]}
                >
                <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={user.friends.username}
                />
        
                </Card>
                </main>
            );
          }
      }
    
      //function that shows search results
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
     
            //if user do not have a partner
            return <main className='profile'>
            
            <Card cover={
            <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            }
            actions={[
                <button key="addPartner" onClick={() => handleAddPartner(data.getUser._id)}>Add Partner</button>,
                
                <button onClick={resetSearch}>Reset Search</button>
  
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

                {showFriend() || (<form onSubmit={handleFormSubmit}>

                    <input type="text"
                        value={username} 
                        onChange={handleChange}>
                    </input>
                    <button type="submit">Search</button>
                </form>
            )}
                
                {showUsers()}
            </Col>
        </Row>

        <Footer></Footer>
        </main>
    );
};

export default Partner;