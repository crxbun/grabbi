import React, { } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';

import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App