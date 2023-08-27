import React,{useState} from 'react';
import Footer from '../Components/Footer';
import { QUERY_ME} from '../utils/queries';
import { CREATE_DATE } from '../utils/mutations';
import { useQuery,useMutation } from '@apollo/client';

import {DatePicker} from "antd";
import {format, parseISO} from 'date-fns'

const LandingPage =()=>{
    const {data,loading} = useQuery(QUERY_ME);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [name,setName] = useState(''); //date name

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

    if(loading){
        return <p>Loading...</p>
    }

    const userData = data?.me || [];
    console.log(userData);

    const handleDateClick=()=>{
        console.log(showCalendar);
        setShowCalendar(prevState  => !prevState);
    };

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
            {userData.dates && userData.dates.map((date) => (
        <li key={date.dateName}>
            <span>Name: {date.dateName}</span>
            <br/>
            <span>Date: {date.dateOfOccasion}</span>
        </li>
    ))}

                <br/>

            <h3>From Partner</h3>
            {userData.friends && userData.friends.dates && userData.friends.dates.map((date) => (
        <li key={date.dateName}>
            <span>Name: {date.dateName}</span>
            <br/>
            <span>Date: {date.dateOfOccasion}</span>
        </li>
    ))}
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