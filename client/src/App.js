import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import NavBar from './pages/NavBar';
import Cusine from './pages/Cusine';
import SearchResults from './pages/SearchResult';
import LoginPage from './pages/LoginPage';
import Signup from './pages/SignUp';
import Recipe from './pages/Recipe';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setIsLoggedIn(false);
      }
      else {
        console.error('Logout failed');
      }
    }
    catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cusine/:type" element={<Cusine />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:name" element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
