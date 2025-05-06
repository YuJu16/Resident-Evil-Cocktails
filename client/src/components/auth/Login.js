import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, error } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [rememberMe, setRememberMe] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
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
              
              <div className="login-with-google">
                <button className="google-btn" onClick={handleGoogleLogin} type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                  </svg>
                  Continuer avec Google
                </button>
              </div>
              
              <div className="login-divider">
                <div className="divider-line"></div>
                <span className="divider-text">Ou</span>
                <div className="divider-line"></div>
              </div>
              
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