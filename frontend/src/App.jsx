import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login';

const App = () => (
    <Routes>
      <Route path="/" element={ <Home /> }></Route>
      <Route path="/login" element={ <Login /> }></Route>
    </Routes>
  )

export default App