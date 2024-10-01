import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import SignupForm from './components/signup';
import Login from './components/login';
import Profile from './pages/profile';
import Navbar from './components/navbar';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
