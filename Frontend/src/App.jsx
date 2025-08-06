import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import Login from './pages/login';
import Signup from './pages/signup';
import MyDocuments from './components/MyDocuments';

function App() {
  return (
    <>

      <Navbar />

      
      <Routes>
        <Route path="/" element={<h1 className="text-white text-center mt-10 text-3xl">Welcome to Real-Time Collaboration Platform</h1>} />
        <Route path="/doc" element={<MyDocuments />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
