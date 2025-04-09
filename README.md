# Umbrella Bar - Cocktails Resident Evil

Bienvenue sur le projet Umbrella Bar, un site web de cocktails inspirés de l'univers Resident Evil. Cette application web permet de découvrir des recettes de cocktails thématiques, avec une interface utilisateur conviviale et un design inspiré de la célèbre franchise de jeux vidéo.

## Fonctionnalités

- **Catalogue de cocktails** : Découvrez une collection de cocktails inspirés de Resident Evil
- **Détails des recettes** : Accédez aux ingrédients, instructions et références thématiques
- **Authentification** : Créez un compte et connectez-vous pour accéder à des fonctionnalités supplémentaires
- **Tri des cocktails** : Organisez les cocktails par date ou par nom
- **Newsletter** : Inscrivez-vous pour recevoir les dernières actualités

## Technologies utilisées

- **Frontend** : React.js, SCSS, Framer Motion
- **Backend** : Node.js, Express
- **Base de données** : MongoDB
- **Authentification** : JWT (JSON Web Tokens)

## Structure du projet

```
├── client/                 # Frontend React
│   ├── public/             # Fichiers statiques
│   └── src/                # Code source React
│       ├── components/     # Composants React
│       ├── context/        # Contextes React
│       └── styles/         # Fichiers SCSS
├── img/                    # Images du projet
│   ├── logo.png            # Logo Umbrella Bar
│   ├── tonoGirl.png        # Image de la fille sur le tonneau
│   └── drinkBoy.png        # Image de l'homme qui boit
└── server.js              # Point d'entrée du serveur Express
```

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (local ou distant)

### Étapes d'installation

1. Clonez le dépôt :
   ```
   git clone <url-du-repo>
   cd Resident-Evil-Cocktails
   ```

2. Installez les dépendances du serveur :
   ```
   npm install
   ```

3. Installez les dépendances du client :
   ```
   npm run install-client
   ```

4. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```
   MONGO_URI=votre_uri_mongodb
   JWT_SECRET=votre_clé_secrète
   PORT=5000
   NODE_ENV=development
   ```

## Démarrage

### Mode développement

Pour lancer le serveur et le client en mode développement :

```
npm run dev
```

Cela lancera le serveur sur http://localhost:5000 et le client sur http://localhost:3000.

### Production

Pour construire l'application pour la production :

```
npm run build
```

Puis pour lancer l'application en production :

```
npm start
```

## Schéma de couleurs

- Arrière-plan : #0D0D0D
- Vert : #4CBB17
- Rouge : #8B0000
- Violet : #66023C

## Crédits

Ce projet a été créé dans le cadre d'un exercice de développement web sur le thème de Resident Evil.