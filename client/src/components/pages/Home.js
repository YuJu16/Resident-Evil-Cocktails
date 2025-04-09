import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Newsletter from '../layout/Newsletter';

const Home = ({ cocktails, loading }) => {
  const [sortedCocktails, setSortedCocktails] = useState([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    if (cocktails.length > 0) {
      const sorted = [...cocktails];
      
      switch (sortOption) {
        case 'newest':
          sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'oldest':
          sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'name-asc':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
      
      setSortedCocktails(sorted);
    }
  }, [cocktails, sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Animation variants pour Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2 className="section-title">Chargement des cocktails...</h2>
      </div>
    );
  }

  // Simuler des données de cocktails pour la démo
  const dummyCocktails = [
    {
      _id: '1',
      name: 'T-Virus Tonic',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=T-Virus+Tonic',
      description: 'Un cocktail vert fluorescent inspiré du virus T de Resident Evil',
      themeReference: 'Inspiré du virus T qui transforme les humains en zombies'
    },
    {
      _id: '2',
      name: 'Nemesis Negroni',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=Nemesis+Negroni',
      description: 'Un cocktail puissant et amer comme le redoutable Nemesis',
      themeReference: "Inspiré du Nemesis, l'une des armes biologiques les plus terrifiantes"
    },
    {
      _id: '3',
      name: 'Raccoon City Rum',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=Raccoon+City+Rum',
      description: 'Un cocktail au rhum qui vous fera oublier les horreurs de Raccoon City',
      themeReference: 'Nommé d\'après la ville fictive où se déroule l\'épidémie de zombies'
    },
    {
      _id: '4',
      name: 'Jill Sandwich',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=Jill+Sandwich',
      description: 'Un cocktail doux et fruité, parfait pour une pause entre deux combats',
      themeReference: 'Référence à la célèbre réplique de Barry Burton dans le premier jeu'
    },
    {
      _id: '5',
      name: 'Licker Liqueur',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=Licker+Liqueur',
      description: 'Un cocktail rouge sang qui vous laissera la langue pendante',
      themeReference: 'Inspiré des créatures Lickers avec leur langue démesurée'
    },
    {
      _id: '6',
      name: 'Umbrella Mojito',
      image: 'https://via.placeholder.com/300x200/4CBB17/FFFFFF?text=Umbrella+Mojito',
      description: 'Un mojito revisité aux couleurs de la corporation Umbrella',
      themeReference: 'Aux couleurs de la sinistre corporation Umbrella'
    }
  ];

  return (
    <div className="home-page">
      <div className="container">
        <section className="featured-cocktails">
          <h2 className="section-title">Derniers cocktails infectés</h2>
          
          <div className="sort-options">
            <select value={sortOption} onChange={handleSortChange}>
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="name-asc">Nom (A-Z)</option>
              <option value="name-desc">Nom (Z-A)</option>
            </select>
          </div>
          
          <motion.div 
            className="cocktails-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {(sortedCocktails.length > 0 ? sortedCocktails : dummyCocktails).map((cocktail) => (
              <motion.div 
                key={cocktail._id} 
                className="cocktail-card"
                variants={itemVariants}
              >
                <Link to={`/cocktail/${cocktail._id}`}>
                  <img 
                    src={cocktail.image} 
                    alt={cocktail.name} 
                    className="cocktail-image" 
                  />
                  <div className="cocktail-content">
                    <h3>Recette {cocktail.name}</h3>
                    <p className="mini-description">{cocktail.description}</p>
                    <p className="note">Note</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        <section className="viral-cocktails">
          <h2 className="section-title">Cocktails viraux</h2>
          
          <motion.div 
            className="cocktails-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {dummyCocktails.slice(0, 6).map((cocktail) => (
              <motion.div 
                key={cocktail._id} 
                className="cocktail-card"
                variants={itemVariants}
              >
                <Link to={`/cocktail/${cocktail._id}`}>
                  <img 
                    src={cocktail.image} 
                    alt={cocktail.name} 
                    className="cocktail-image" 
                  />
                  <div className="cocktail-content">
                    <h3>Recette {cocktail.name}</h3>
                    <p className="mini-description">{cocktail.description}</p>
                    <p className="note">Note</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
      
      <Newsletter />
    </div>
  );
};

export default Home;