import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [localError, setLocalError] = useState('');

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      setLocalError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setLocalError('');
    await register({ name, email, password });
    
    // Rediriger vers la page d'accueil si l'inscription réussit
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <motion.div 
        className="auth-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Inscription</h2>
        
        {(error || localError) && (
          <div className="error-message">{error || localError}</div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password2">Confirmer le mot de passe</label>
            <input
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-block">
            S'inscrire
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;