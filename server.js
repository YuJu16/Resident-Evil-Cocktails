const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resident-evil-cocktails');
    console.log('MongoDB connecté avec succès');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB:', err.message);
    process.exit(1);
  }
};

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

// Routes API
// Route pour obtenir tous les cocktails
app.get('/api/cocktails', async (req, res) => {
  try {
    const cocktails = await Cocktail.find().sort({ date: -1 });
    res.json(cocktails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour obtenir un cocktail spécifique
app.get('/api/cocktails/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
      return res.status(404).json({ msg: 'Cocktail non trouvé' });
    }
    res.json(cocktail);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Cocktail non trouvé' });
    }
    res.status(500).send('Erreur serveur');
  }
});

// Route pour créer un cocktail
app.post('/api/cocktails', async (req, res) => {
  const { name, image, ingredients, recipe, themeReference, description } = req.body;

  try {
    const newCocktail = new Cocktail({
      name,
      image,
      ingredients,
      recipe,
      themeReference,
      description
    });

    const cocktail = await newCocktail.save();
    res.json(cocktail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

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