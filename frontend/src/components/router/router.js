import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import inicio from "../inicio";
import React from 'react'

const router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<inicio/>} />
            <Route path='/login' element={<Login/>} />

        </Routes>
    </BrowserRouter>
  );
}

export default router
