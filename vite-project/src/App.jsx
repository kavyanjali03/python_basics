import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Landing from './components/landing'
import Qrcode from './components/Qrcode';


function App() {


  return (
    <>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Qrcode" element={<Qrcode />} />
      </Routes>
    
    </>
  )
}

export default App
