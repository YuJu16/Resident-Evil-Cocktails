import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, error } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
    // Rediriger vers la page d'accueil si la connexion réussit
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <img src="/img/logo.png" alt="Umbrella Bar Logo" className="login-logo" />
        </div>
        
        <div className="login-content">
          <div className="login-form-container">
            <h1>Bienvenue sur Umbrella Bar</h1>
            <p className="login-subtitle">Infecte-toi et découvre les cocktails qui feront muter tes soirées !</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="login-with-google">
              <button className="google-btn">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                Continuer avec Google
              </button>
            </div>
            
            <div className="login-divider">
              <span className="divider-line"></span>
              <span className="divider-text">Ou</span>
              <span className="divider-line"></span>
            </div>
            
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Email"
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Mot de passe"
                  required
                />
              </div>
              
              <div className="remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label htmlFor="remember">Se souvenir de moi pendant 30 jours</label>
              </div>
              
              <button type="submit" className="login-btn">
                Se connecter
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous</Link>
              </p>
            </div>
          </div>
          
          <div className="login-image-container">
            <img src="/img/imgCo.png" alt="Resident Evil" className="login-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;