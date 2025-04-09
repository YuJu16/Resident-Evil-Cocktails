import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour envoyer l'email à votre API
    console.log('Email soumis:', email);
    setSubscribed(true);
    setEmail('');
    
    // Réinitialiser l'état après 3 secondes
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-container">
        <motion.div 
          className="newsletter-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="../../../img/tonoGirl.png" />
        </motion.div>
        
        <motion.div 
          className="newsletter-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Pour plus d'actualité !</h2>
          <p>Inscrivez-vous à notre newsletter :</p>
          
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="success-message"
            >
              Merci pour votre inscription !
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Votre adresse e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn">Envoyer !</button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;