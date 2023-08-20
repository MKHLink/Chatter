import React,{useState} from 'react';
import Footer from '../Components/Footer';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LandingPage =()=>{
    const {data,loading} = useQuery(QUERY_ME);
    const [showCalendar, setShowCalendar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    if(loading){
        return <p>Loading...</p>
    }

    const userData = data?.me || [];
    console.log(userData);

    const handleDateClick=()=>{
        console.log(showCalendar);
        setShowCalendar(prevState  => !prevState);
    };

    return(
        <main>
            <button onClick={handleDateClick}>Add Date</button>
            <div>
            {showCalendar && (
            <>
             <DatePicker selected={startDate} 
             onChange={(date) => setStartDate(date)} 
             showYearDropdown
             showMonthDropdown
             />
             <br/>
             <input type="text" placeholder='Name'></input>
             <button>Save</button>
            </> 
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