import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

  // Validation du mot de passe
  const validatePassword = (password) => {
    // Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
    }
    return null;
  };

  // Fonction pour s'inscrire
  const register = async (formData) => {
    try {
      // Validation du mot de passe
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setError(passwordError);
        return false;
      }

      const res = await axios.post('/api/users', formData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
      setRegistrationSuccess(true);
      // Simuler l'envoi d'un email de confirmation
      console.log(`Email de confirmation envoyé à ${formData.email}`);
      return true;
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.msg.includes('existe déjà')) {
        setError('Cet email ou ce pseudo est déjà utilisé');
      } else {
        setError(err.response?.data?.msg || 'Erreur lors de l\'inscription');
      }
      return false;
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
      return true;
    } catch (err) {
      setError(err.response?.data?.msg || 'Identifiants invalides');
      return false;
    }
  };

  // Fonction pour se connecter avec Google
  const loginWithGoogle = async () => {
    try {
      // Rediriger vers l'API d'authentification Google avec le chemin complet
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}/api/auth/google`;
      return true;
    } catch (err) {
      setError('Erreur lors de la connexion avec Google');
      return false;
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
        registrationSuccess,
        register,
        login,
        loginWithGoogle,
        logout,
        validatePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};