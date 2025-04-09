import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Vérifier si l'utilisateur est déjà authentifié au chargement
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('token')) {
        try {
          // Configuration des en-têtes avec le token
          const config = {
            headers: {
              'x-auth-token': localStorage.getItem('token')
            }
          };

          // Requête pour obtenir les données de l'utilisateur
          const res = await axios.get('/api/auth', config);
          setUser(res.data);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (err) {
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Fonction pour s'inscrire
  const register = async (formData) => {
    try {
      const res = await axios.post('/api/users', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err.response.data.msg || 'Erreur lors de l\'inscription');
    }
  };

  // Fonction pour se connecter
  const login = async (formData) => {
    try {
      const res = await axios.post('/api/auth', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err.response.data.msg || 'Identifiants invalides');
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};