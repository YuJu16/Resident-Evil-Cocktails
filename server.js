const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth/google', require('./routes/auth-google'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cocktails', require('./routes/cocktails'));

// Importer la configuration de la base de données
const connectDB = require('./config/db');

// Connexion à la base de données
connectDB();

// Définition des modèles
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const cocktailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  recipe: { type: String, required: true },
  themeReference: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Cocktail = mongoose.model('Cocktail', cocktailSchema);

// Les routes API sont maintenant gérées par les fichiers de routes importés

// Servir les assets statiques en production
if (process.env.NODE_ENV === 'production') {
  // Définir le dossier statique
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Définir le port et lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));