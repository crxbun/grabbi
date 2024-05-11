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
import Profile from './User/Profile';
import ManageRecipes from './User/ManageRecipes';
import MyFeed from './User/MyFeed';
import CreateRecipe from './components/CreateRecipe';
import ResetPassword from './pages/ResetPassword';
import UserRecipe from './pages/UserRecipe';
import Recommendation from './pages/Recommendation';
import { useState } from 'react';

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
        alert("Logout failed! There was an issue processing your logout. Please try again.");
      }
    }
    catch (error) {
      console.error('Error: ', error);
      alert("Logout failed! There was an issue processing your logout. Please try again.");
    }
  };

  return (
    <BrowserRouter>
      <NavBar isLoggedIn={ isLoggedIn } handleLogout={ handleLogout } />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cusine/:type" element={<Cusine />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage onLogin={ handleLogin } />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:name" element={<Recipe/>}/>
        <Route path="/profile/:user-id" element={<Profile/>}/>
        <Route path="/manage-recipes" element={<ManageRecipes/>}/>
        <Route path="/myfeed" element={<MyFeed/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path ="/user-recipe/:userId/:recipeId" element={<UserRecipe/>}/>
        <Route path ="/create-recipe" element={<CreateRecipe/>}/>
        <Route path="/shopping-list" element={<Recommendation/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
