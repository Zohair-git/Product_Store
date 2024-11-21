// src/App.js
import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AddCategory from './Pages/AddCategory';
import AddProduct from './Pages/AddProduct';
import Home from './Pages/Home';

const App = () => {
    return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/product' element={<AddProduct/>} />
      <Route path='/category' element={<AddCategory/>}/>
      
      <Route path='/' element={<Home/>} />

  
      </Routes>
      </BrowserRouter>
    )
  }
  
export default App;
