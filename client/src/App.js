import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import './styles/auth.scss'; // Styles pour l'authentification

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

    // Vérifier si un token est présent dans l'URL (après authentification Google)
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    
    if (token) {
      // Stocker le token dans localStorage
      localStorage.setItem('token', token);
      // Rediriger vers la page d'accueil sans le token dans l'URL
      window.history.pushState({}, document.title, '/');
    }
  }, []);

  // Vérifier si l'utilisateur est sur la page de connexion
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const hideHeaderFooter = isLoginPage || isRegisterPage;

  return (
    <AuthProvider>
      <div className="app">
        {!hideHeaderFooter && <Header />}
        <main className={hideHeaderFooter ? "container-full" : "container"}>
          <Routes>
            <Route path="/" element={<Home cocktails={cocktails} loading={loading} />} />
            <Route path="/cocktail/:id" element={<CocktailDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!hideHeaderFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;