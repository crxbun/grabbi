import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import NavBar from './pages/NavBar';
import Cusine from './pages/Cusine';
import SearchResults from './pages/SearchResult';
import LoginPage from './pages/LoginPage';
import Signup from './pages/SignUp';
import Recipe from './pages/Recipe';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cusine/:type" element={<Cusine />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:name" element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
