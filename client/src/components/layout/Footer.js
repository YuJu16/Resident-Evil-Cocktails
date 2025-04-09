import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="social-links">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        
        <div className="footer-text">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Pour plus d'actualité suis nous sur nos réseaux
          </motion.p>
        </div>
        
        <div className="footer-image">
          <img src="/img/drinkBoy.png" alt="Drink illustration" />
          <style jsx>{`
            .footer-image img {
            max-width: 200px;
            height: auto;
            }
          `}</style>
        </div>

        <div className="footer-break">
          <hr />
        </div>
        <div className="footer-links">
          
          <Link to="/service-client">Service Client</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/paiement">Paiement</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;