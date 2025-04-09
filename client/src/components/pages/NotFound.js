import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="container">
      <motion.div 
        className="not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>404</h1>
        <h2>Page Non Trouvée</h2>
        <p>La page que vous recherchez semble avoir été infectée par le virus T...</p>
        <Link to="/" className="back-home">
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;