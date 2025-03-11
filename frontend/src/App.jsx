import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useAuthContext } from './hooks/useAuthContext';
import { useGoogleLogin } from './hooks/useGoogleLogin';
import Cookies from 'js-cookie';

const App = () => {
    const { user } = useAuthContext();
    const {googleLogin, isLoading, error} = useGoogleLogin();
    // if(Cookies.get('session') && Cookies.get('session.sig')){
    //   googleLogin();
    // }
    useEffect(() => {
      if(Cookies.get('session') && Cookies.get('session.sig')){
        googleLogin();
      }},[]);
    return (
    <Routes>
      <Route path="/" element={ user ? <Home /> : <Navigate to="/login"/> }></Route>
      <Route path="/login" element={ user ? <Navigate to="/"/> : <Login/> }></Route>
      <Route path="/signup" element={ user ? <Navigate to="/"/> : <SignUp/> }></Route>
    </Routes>
  )}

export default App