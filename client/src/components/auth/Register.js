import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, loginWithGoogle, validatePassword, registrationSuccess } = useContext(AuthContext);
  
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

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

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