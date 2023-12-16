import React, { useState } from 'react';
import { BrowserRouter as BrowserRouter, Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Brand from './Components/Brand';
import Employee from './Components/Employee';
import Customer from './Components/Customer';
import HomePage from './Components/HomePage';
import Home from "./Components/Home";
import Login from "./Components/Login";
import MyPage from './Components/MyPage';



function App() {
  return(<>
    <MyPage/>
  </>)
  /*return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route index element={<Home />} />
          <Route path="brands" element={<Brand />} />
          <Route path="employee" element={<Employee />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );*/
}

export default App;

