import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rooms from './pages/Rooms';
import ChatView from './pages/ChatView';

function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Rooms />} />
        <Route path='/chat/:item' element={<ChatView />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
