import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Dashboard/Home';
import Expenses from './pages/Dashboard/Expenses';
import Income from './pages/Dashboard/Income';



function App() {
 

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signup" exact element={<Signup/>} />
          <Route path="/dashboard" exact element={<Home/>} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expenses" exact element={<Expenses />} />

        </Routes>
      </Router>
  
  )
}

export default App;
const Root=()=>{
  const isAuthenticated=!! localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />):(
      <Navigate to="/login" />

  )
}
