import React from "react";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
   <main>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
   </main>
  );
}

export default App;
