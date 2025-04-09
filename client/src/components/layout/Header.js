import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">
            <img src="../../../public/img/logo.png" alt="Umbrella Bar Logo" />  
          </Link>
        </motion.div>

        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            Qui sommes nous ?
          </Link>
          <Link to="/recettes" className={location.pathname.includes('/recettes') ? 'active' : ''}>
            recette de cocktail
          </Link>
          <Link to="/trucs-astuces" className={location.pathname.includes('/trucs-astuces') ? 'active' : ''}>
            Trucs & astuces
          </Link>
        </nav>

        <div className="user-actions">
          <div className="search-bar">
            {/* <input type="text" placeholder="Rechercher ici..." /> */}
            {/* <i className="fas fa-search search-icon"></i> */}
          </div>

          <div className="user-menu">
            <i className="fas fa-user user-icon" onClick={toggleDropdown}></i>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              {isAuthenticated ? (
                <>
                  <Link to="/profile">Mon profil</Link>
                  <Link to="/favorites">Mes favoris</Link>
                  <button onClick={logout}>Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/login">Connexion</Link>
                  <Link to="/register">Inscription</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;