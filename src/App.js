import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddProduct from './page/AddProduct';
import Cart from './page/Cart';
import Chat from './page/Chat';
import EditPage from './page/EditPage';
import Home from './page/Home';

function App() {




  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/carts' element={<Cart />} />
        <Route path='/add-product/:id' element={<EditPage />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>


    </div>
  );
}

export default App;
