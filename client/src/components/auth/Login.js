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
  
  const [rememberMe, setRememberMe] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    // Rediriger vers la page d'accueil si la connexion réussit
    if (success) {
      navigate('/');
    }
  };

  return (
    <motion.div 
      className="login-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-container">
        <motion.div 
          className="login-form-side"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="logo-container">
            <Link to="/">
              <img src="/img/logo.png" alt="Umbrella Bar Logo" className="login-logo" />
            </Link>
          </div>
          <div className="login-content">
            <div className="login-form-container">
              <h1>Bienvenue sur Umbrella Bar</h1>
              <p className="login-subtitle">Infecte-toi et découvre les cocktails qui feront muter tes soirées !</p>
              

              {/* Formulaire de connexion */}
              <form onSubmit={onSubmit}>
                {error && (
                  <div className="error-message">{error}</div>
                )}
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
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Se souvenir de moi pendant 30 jours</label>
                </div>
                
                <button type="submit" className="login-btn">
                  Se connecter
                </button>
              </form>
              
              <div className="auth-footer">
                <p>Vous n'avez pas de compte? <Link to="/register">Inscrivez-vous</Link></p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="login-image-container"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img src="/img/imgCo.png" alt="Resident Evil" className="login-image" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;