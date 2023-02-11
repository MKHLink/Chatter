import React from "react";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/Home";

function App() {
  return (
   <main>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
      </Routes>
    </Router>
   </main>
  );
}

export default App;
