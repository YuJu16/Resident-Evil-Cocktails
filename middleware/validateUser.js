const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  // Validation du nom
  if (!name || name.length < 2) {
    return res.status(400).json({ msg: 'Le nom doit contenir au moins 2 caractères' });
  }

  // Validation de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Veuillez fournir une adresse email valide' });
  }

  // Validation du mot de passe
  if (!password || password.length < 8) {
    return res.status(400).json({ msg: 'Le mot de passe doit contenir au moins 8 caractères' });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    });
  }

  next();
};

module.exports = validateUser;