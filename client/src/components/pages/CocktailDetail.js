import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from '../common/Loader';

const CocktailDetail = () => {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCocktail = async () => {
      try {
        // En production, remplacer par un appel API réel
        // const res = await axios.get(`/api/cocktails/${id}`);
        // setCocktail(res.data);
        
        // Données fictives pour la démo
        setTimeout(() => {
          const dummyCocktail = {
            _id: id,
            name: 'T-Virus Tonic',
            image: 'https://via.placeholder.com/600x400/4CBB17/FFFFFF?text=T-Virus+Tonic',
            ingredients: [
              '60ml de Vodka',
              '30ml de Curaçao bleu',
              '15ml de sirop de sucre',
              '15ml de jus de citron vert',
              'Glaçons',
              'Garniture: tranche de citron vert et brouillard de glace carbonique'
            ],
            recipe: 'Dans un shaker rempli de glaçons, versez la vodka, le curaçao bleu, le sirop de sucre et le jus de citron vert. Secouez vigoureusement pendant 15 secondes. Filtrez dans un verre à martini préalablement refroidi. Pour un effet spécial, ajoutez un peu de glace carbonique pour créer un effet de brouillard (à manipuler avec précaution). Garnissez d\'une tranche de citron vert.',
            themeReference: 'Inspiré du virus T qui transforme les humains en zombies dans la série Resident Evil. La couleur verte fluorescente rappelle les tubes d\'échantillons de virus dans les laboratoires d\'Umbrella Corporation.',
            description: 'Ce cocktail d\'un vert éclatant évoque les substances chimiques mortelles de la franchise Resident Evil. Son goût acidulé avec une touche sucrée en fait une boisson rafraîchissante, tandis que l\'effet de brouillard rappelle l\'atmosphère inquiétante des laboratoires souterrains d\'Umbrella.'
          };
          setCocktail(dummyCocktail);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Erreur lors du chargement du cocktail:', err);
        setError('Impossible de charger les détails du cocktail');
        setLoading(false);
      }
    };

    fetchCocktail();
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>{error}</h2>
          <Link to="/" className="btn">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  if (!cocktail) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Cocktail non trouvé</h2>
          <Link to="/" className="btn">Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div 
        className="cocktail-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="cocktail-header">
          <motion.img 
            src={cocktail.image} 
            alt={cocktail.name}
            className="cocktail-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="cocktail-info">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cocktail.name}
            </motion.h1>
            
            <motion.p 
              className="theme-reference"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <strong>Référence thématique:</strong> {cocktail.themeReference}
            </motion.p>
            
            <motion.p 
              className="description"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {cocktail.description}
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          className="cocktail-recipe"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2>Préparation</h2>
          
          <div className="ingredients">
            <h3>Ingrédients:</h3>
            <ul>
              {cocktail.ingredients.map((ingredient, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="instructions">
            <h3>Instructions:</h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {cocktail.recipe}
            </motion.p>
          </div>
        </motion.div>
        
        <motion.div
          className="back-button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link to="/" className="btn">
            <i className="fas fa-arrow-left"></i> Retour aux cocktails
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CocktailDetail;