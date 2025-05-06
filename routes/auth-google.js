const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Configuration de Passport pour Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Utilisateur existant
          return done(null, user);
        }

        // Créer un nouvel utilisateur
        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          // Générer un mot de passe aléatoire car le champ est requis
          password: crypto.randomBytes(16).toString('hex')
        });

        // Hasher le mot de passe avant de sauvegarder
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        console.error('Erreur d\'authentification Google:', err);
        return done(err, null);
      }
    }
  )
);

// Initialisation de Passport
router.use(passport.initialize());

// Route pour démarrer l'authentification Google
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback après authentification Google
router.get(
  '/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      // Créer et retourner le JWT
      const payload = {
        user: {
          id: req.user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 }, // 1 heure
        (err, token) => {
          if (err) throw err;
          // Rediriger vers la page d'accueil avec le token
          res.redirect(`/?token=${token}`);
        }
      );
    } catch (err) {
      console.error('Erreur lors de la création du token:', err);
      res.redirect('/login');
    }
  }
);

module.exports = router;