import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import MyDocuments from './components/MyDocuments'
<Route path="/my-documents" element={<MyDocuments />} />

function App() {
  

  return (
    <>
      <Header/>
      <Navbar />
      <MyDocuments/>
    </>
  )
}

export default App
