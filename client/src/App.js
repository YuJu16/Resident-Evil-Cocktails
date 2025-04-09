import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Composants
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import CocktailDetail from './components/pages/CocktailDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/pages/NotFound';

// Contexte
import { AuthProvider } from './context/AuthContext';

// Styles
import './styles/App.scss'; // Décommenté pour appliquer les styles

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les cocktails depuis l'API
    const fetchCocktails = async () => {
      try {
        const res = await axios.get('/api/cocktails');
        setCocktails(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement des cocktails:', err);
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home cocktails={cocktails} loading={loading} />} />
            <Route path="/cocktail/:id" element={<CocktailDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;