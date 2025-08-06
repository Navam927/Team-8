import { useState } from 'react'
import {Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {
  

  return (
  
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  
  )
}

export default App
