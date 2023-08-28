import React,{useState} from 'react';
import Footer from '../Components/Footer';
import { QUERY_ME} from '../utils/queries';
import { CREATE_DATE } from '../utils/mutations';
import { useQuery,useMutation } from '@apollo/client';
import { DELETE_DATE } from '../utils/mutations';

import {DatePicker, List, Avatar} from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {format, parseISO} from 'date-fns'

const LandingPage =()=>{
    const {data,loading} = useQuery(QUERY_ME);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [name,setName] = useState(''); //date name

    //handles date creation query and updating the cache
    const [createDate] = useMutation(CREATE_DATE, {
        update(cache, {data: {createDate}})
        {
            const {me} = cache.readQuery({query:QUERY_ME});
            cache.writeQuery({
                query: QUERY_ME,
                data: {me:{...me, dates: [...me.dates, createDate]}},
            });
        },
    });

    //date deleting and cache updating
    const [deleteDate] = useMutation(DELETE_DATE,{
        update(cache,{data: {deleteDate}}){
            const {me} = cache.readQuery({query: QUERY_ME});
            const updatedDates = me.dates.filter(date =>date._id !== deleteDate._id);
            cache.writeQuery({
                query: QUERY_ME,
                data:{me:{...me,dates:updatedDates}},
            });
        },
    });

    if(loading){
        return <p>Loading...</p>
    }

    const userData = data?.me || [];
    console.log(userData);

    const handleDateClick=()=>{
        console.log(showCalendar);
        setShowCalendar(prevState  => !prevState);
    };

    //handles createDate function
    const handleSave = async (e) =>{
        e.preventDefault();
        try{
            await createDate({
                variables: {
                    name, date: startDate.toISOString() }});
                    setName('');
        }catch(error){
            console.log(error);
        }
        setShowCalendar(false);
    };

    //handles the deleteDate function
    const handleDeleteDate = async(dateId)=>{
        console.log("deleting date ", dateId);
        try{
            await deleteDate({
                variables:{
                    dateId,
                },
            });
        }catch(error){
            console.log(error);
        }
    };

    return(
        <main>
            <button onClick={handleDateClick}>Add Date</button>
            <div>
            {showCalendar && (
            <form onSubmit={handleSave}>
             <DatePicker selected={startDate} 
             onChange={(date) => setStartDate(date)} 
             showYearDropdown
             showMonthDropdown
             />
             <br/>
             <input type="text" placeholder='Name'
                value={name} 
                onChange={(e)=>setName(e.target.value)}>
                </input>
             <button type="submit">Save</button>
            </form> 
           )}
           <br/>
            </div>
            <br/>
            <div>
            <h2>Dates</h2>
            <ul>

            {userData.dates && userData.dates.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={userData.dates}
            renderItem={date => (
              <List.Item
                actions={[
                  <EditOutlined
          key="edit"
        //   onClick={() => handleEditDate(date.dateName)} // Add your edit function here
        />,
        <DeleteOutlined
          key="delete"
          onClick={() => handleDeleteDate(date._id)} // Add your delete function here
        />,
      ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${date.dateName}`} />}
                  title={<span>Name: {date.dateName}</span>}
                  description={<span>Date: {date.dateOfOccasion}</span>}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>No dates available.</p>
        )}

                <br/>

            <h3>From Partner</h3>
            {userData.friends && userData.friends.dates && userData.friends.dates.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={userData.friends.dates}
            renderItem={date => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${date.dateName}`} />}
                  title={<span>Name: {date.dateName}</span>}
                  description={<span>Date: {date.dateOfOccasion}</span>}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>No dates available.</p>
        )}
            </ul>
            </div>

            <br/>
            <div>
            <h2>Notes</h2>
            <ul>
            {userData.messages && userData.messages.map((message) => (
        <li key={message._id}>
            <span>{message.textBody}</span>
        </li>
    ))}

                <br/>
                <h3>From Partner</h3>
                {userData.friends && userData.friends.messages && userData.friends.messages.map((message) => (
        <li key={message._id}>
            <span>{message.textBody}</span>
        </li>
    ))}
            </ul>
            </div>
            <Footer></Footer>
        </main>
    );
};

export default LandingPage;

