const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Cocktail = require('../models/Cocktail');

// @route   GET api/cocktails
// @desc    Récupérer tous les cocktails
// @access  Public
router.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find().sort({ date: -1 });
    res.json(cocktails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   GET api/cocktails/:id
// @desc    Récupérer un cocktail par son ID
// @access  Public
router.get('/:id', async (req, res) => {
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

// @route   POST api/cocktails
// @desc    Créer un nouveau cocktail
// @access  Private (nécessite authentification)
router.post('/', auth, async (req, res) => {
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

// @route   PUT api/cocktails/:id
// @desc    Mettre à jour un cocktail
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, image, ingredients, recipe, themeReference, description } = req.body;

  // Construire l'objet cocktail
  const cocktailFields = {};
  if (name) cocktailFields.name = name;
  if (image) cocktailFields.image = image;
  if (ingredients) cocktailFields.ingredients = ingredients;
  if (recipe) cocktailFields.recipe = recipe;
  if (themeReference) cocktailFields.themeReference = themeReference;
  if (description) cocktailFields.description = description;

  try {
    let cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({ msg: 'Cocktail non trouvé' });
    }

    // Mettre à jour
    cocktail = await Cocktail.findByIdAndUpdate(
      req.params.id,
      { $set: cocktailFields },
      { new: true }
    );

    res.json(cocktail);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// @route   DELETE api/cocktails/:id
// @desc    Supprimer un cocktail
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (!cocktail) {
      return res.status(404).json({ msg: 'Cocktail non trouvé' });
    }

    await Cocktail.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Cocktail supprimé' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Cocktail non trouvé' });
    }
    
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;