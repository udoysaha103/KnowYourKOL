import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';

const App = () => (
    <Routes>
        <Route path="/login" element={ <Login /> }></Route>
    </Routes>
  )

export default App