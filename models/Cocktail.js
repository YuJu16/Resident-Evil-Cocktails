const mongoose = require('mongoose');

const CocktailSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  ingredients: [{ 
    type: String, 
    required: true 
  }],
  recipe: { 
    type: String, 
    required: true 
  },
  themeReference: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Cocktail', CocktailSchema);