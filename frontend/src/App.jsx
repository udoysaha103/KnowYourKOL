import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useAuthContext } from './hooks/useAuthContext';

const App = () => {
    const { user } = useAuthContext();
    return (
    <Routes>
      <Route path="/" element={ user ? <Home /> : <Navigate to="/login"/> }></Route>
      <Route path="/login" element={ user ? <Navigate to="/"/> : <Login/> }></Route>
      <Route path="/signup" element={ user ? <Navigate to="/"/> : <SignUp/> }></Route>
    </Routes>
  )}

export default App