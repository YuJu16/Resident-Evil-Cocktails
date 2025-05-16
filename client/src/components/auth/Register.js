import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, validatePassword, registrationSuccess } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [localError, setLocalError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Vérification de la force du mot de passe en temps réel
    if (e.target.name === 'password') {
      const password = e.target.value;
      if (password.length === 0) {
        setPasswordStrength('');
      } else if (password.length < 8) {
        setPasswordStrength('faible');
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        setPasswordStrength('fort');
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        setPasswordStrength('moyen');
      } else {
        setPasswordStrength('faible');
      }
    }
    
    // Réinitialiser les erreurs lors de la modification des champs
    setLocalError('');
  };

  // Vérifier si l'inscription a réussi et afficher un message de confirmation
  useEffect(() => {
    if (registrationSuccess) {
      setRegistrationCompleted(true);
    }
  }, [registrationSuccess]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier que les mots de passe correspondent
    if (password !== password2) {
      setLocalError('Les mots de passe ne correspondent pas');
      return;
    }
    
    // Valider le mot de passe
    const passwordError = validatePassword(password);
    if (passwordError) {
      setLocalError(passwordError);
      return;
    }
    
    setLocalError('');
    const success = await register({ name, email, password });
    
    // Si l'inscription réussit, afficher un message de confirmation
    if (success) {
      setRegistrationCompleted(true);
      // Le redirect sera géré après que l'utilisateur ait vu le message de confirmation
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
              <h1>Rejoignez Umbrella Bar</h1>
              <p className="login-subtitle">Créez votre compte et découvrez nos cocktails viraux !</p>
              

              {/* Message de confirmation d'inscription */}
              {registrationCompleted ? (
                <div className="success-message">
                  <h3>Inscription réussie !</h3>
                  <p>Un email de confirmation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.</p>
                  <button 
                    className="login-btn" 
                    onClick={() => navigate('/')}
                    style={{ marginTop: '20px' }}
                  >
                    Aller à l'accueil
                  </button>
                </div>
              ) : (
                /* Formulaire d'inscription */
                <form onSubmit={onSubmit}>
                  {(error || localError) && (
                    <div className="error-message">{error || localError}</div>
                  )}
                
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Nom complet"
                    required
                  />
                </div>
                
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
                  {passwordStrength && (
                    <div className={`password-strength ${passwordStrength}`}>
                      Force du mot de passe: {passwordStrength}
                    </div>
                  )}
                  <small className="password-requirements">
                    Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.
                  </small>
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirmer le mot de passe"
                    required
                  />
                </div>
                
                <button type="submit" className="login-btn">
                  S'inscrire
                </button>
              </form>
              )}
              
              <div className="auth-footer">
                <p>Vous avez déjà un compte? <Link to="/login">Connectez-vous</Link></p>
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

export default Register;