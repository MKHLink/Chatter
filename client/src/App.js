import React from "react";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from "./Pages/SignUp";

function App() {
  return (
   <main>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
   </main>
  );
}

export default App;
