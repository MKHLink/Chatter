import React from "react";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from "./Pages/SignUp";
import LandingPage from "./Pages/Home";

import {setContext} from '@apollo/client/link/context';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


const httpLink = createHttpLink({
  uri:'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
   <ApolloProvider client={client}>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
      </Routes>
    </Router>
   </ApolloProvider>
  );
}

export default App;
