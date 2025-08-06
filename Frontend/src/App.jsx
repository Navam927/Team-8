import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from "./pages/dash";

function App() {
  return (
    <>

      <Navbar />

      
      <Routes>
        <Route path="/" element={<h1 className="text-white text-center mt-10 text-3xl">Welcome to Real-Time Collaboration Platform</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
