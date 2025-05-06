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
            <img src="/img/logo.png" alt="Umbrella Bar Logo" style={{ width: '120px', height: 'auto' }} />
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

          <div className="user-actions-container">
            {isAuthenticated && (
              <>
                <Link to="/settings" className="icon-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                  </svg>
                </Link>
                <Link to="/favorites" className="icon-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                  </svg>
                </Link>
              </>
            )}
            <div className="user-menu">
              <i className="fas fa-user user-icon" onClick={toggleDropdown}></i>
              <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">Mon profil</Link>
                    <Link to="/favorites">Mes favoris</Link>
                    <Link to="/settings">Réglages</Link>
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
      </div>
    </header>
  );
};

export default Header;