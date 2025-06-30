
import React, { useState, useEffect } from "react";
import './style.css';
import Home from './home';
import { Routes, Route, useNavigate } from "react-router-dom";
import JoinUs from './components/Joinus/join';
import Login from './components/Joinus/login';
import AdminPage from './components/Admin/admin';
import userContext from "./components/userContext/context";
import ForgetPassword from './components/Joinus/forgotPass';
import  VerifyOtp  from './components/Joinus/verifyOtp';
import  NewPassword  from './components/Joinus/newPassword';

const App = () => {
  const [auth, setAuth] = useState();

  const navigate =  useNavigate();
  
  const authUser =  localStorage.getItem('user');

  useEffect(() => {
    if(authUser){
      navigate('/admin')
    }else{
      navigate('/signin')
    }
  },[authUser])

  return(
    <>
    <userContext.Provider value ={{auth, setAuth}}>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/signup" element={<JoinUs/>}></Route>
          <Route path="/signin" element={<Login/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/forget/password" element={<ForgetPassword/>}></Route>
          <Route path="/verifyotp" element={<VerifyOtp/>}></Route>
          <Route path="/newpassword" element={<NewPassword/>}></Route>


        </Routes>
    </userContext.Provider>

    </>
  )
};

export default App;