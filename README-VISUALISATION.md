# Guide de Visualisation - Umbrella Bar (Cocktails Resident Evil)

## Problèmes identifiés

Lors du lancement de l'application, deux problèmes principaux ont été identifiés :

1. **Erreur de connexion à MongoDB** : 
   ```
   Erreur de connexion à MongoDB: connect ECONNREFUSED ::1:27017
   ```
   Le serveur ne peut pas se connecter à la base de données MongoDB locale.

2. **Erreur avec les fichiers SCSS** :
   ```
   Module build failed (from ../node_modules/resolve-url-loader/index.js):
   TypeError: Cannot read properties of undefined (reading 'replace')
   ```
   Un problème avec le chargement des fichiers de style SCSS empêche le démarrage correct du frontend.

## Solutions pour visualiser le site

### 1. Configuration de MongoDB

Pour résoudre l'erreur de connexion à MongoDB :

1. **Installer MongoDB** si ce n'est pas déjà fait :
   - Téléchargez MongoDB Community Server depuis [le site officiel](https://www.mongodb.com/try/download/community)
   - Suivez les instructions d'installation

2. **Démarrer le service MongoDB** :
   - Sur Windows, ouvrez les Services (services.msc) et vérifiez que le service "MongoDB" est démarré
   - Ou exécutez MongoDB en tant que service avec la commande : `mongod --dbpath="C:\data\db"`

### 2. Correction des problèmes de style SCSS

Pour résoudre les erreurs liées aux fichiers SCSS :

1. **Mettre à jour les dépendances** :
   ```
   cd client
   npm install sass resolve-url-loader --save-dev
   ```

2. **Simplifier temporairement les imports SCSS** :
   - Modifiez le fichier `App.js` pour importer uniquement les styles nécessaires
   - Commentez temporairement la ligne `import './styles/index.scss';` dans `index.js`

### 3. Lancement de l'application

Une fois les problèmes résolus, vous pouvez lancer l'application :

1. **Démarrer le serveur backend uniquement** :
   ```
   npm run server
   ```
   Le serveur sera accessible sur http://localhost:5000

2. **Démarrer le client frontend uniquement** :
   ```
   npm run client
   ```
   L'interface utilisateur sera accessible sur http://localhost:3000

3. **Démarrer les deux simultanément** :
   ```
   npm run dev
   ```

## Structure du projet

Le projet est organisé comme suit :

- **Backend** : Serveur Express avec MongoDB
  - Routes API pour les cocktails et l'authentification
  - Modèles de données pour les utilisateurs et les cocktails

- **Frontend** : Application React
  - Composants pour l'affichage des cocktails
  - Système d'authentification
  - Styles SCSS avec le thème Resident Evil

## Fonctionnalités disponibles

Une fois l'application lancée, vous pourrez :

- Consulter la liste des cocktails inspirés de Resident Evil
- Voir les détails de chaque cocktail (ingrédients, recette, référence thématique)
- Créer un compte utilisateur et vous connecter
- Naviguer dans une interface au design inspiré de l'univers Resident Evil

## Thème visuel

L'application utilise les couleurs officielles du thème Resident Evil :
- Fond noir (#0D0D0D)
- Vert Umbrella Corporation (#4CBB17)
- Rouge sang (#8B0000)
- Violet T-Virus (#66023C)
- Texte blanc (#FFFFFF)