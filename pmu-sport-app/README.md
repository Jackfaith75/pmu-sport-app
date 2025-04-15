# PMU Sport - Plateforme d'activités sportives

Ce projet est une application web responsive permettant aux collaborateurs du PMU de partager et de s'inscrire à des activités sportives.

## Fonctionnalités

- Consultation des activités sportives (tableau et agenda)
- Filtrage par catégorie et par date
- Proposition de nouvelles activités
- Création de nouvelles catégories
- Inscription aux activités sans authentification
- Interface responsive (ordinateur et mobile)

## Technologies utilisées

- Next.js (React)
- Tailwind CSS
- Cloudflare Workers (simulation de base de données)

## Déploiement

L'application est déployée sur Vercel et accessible à l'adresse fournie.

## Structure du projet

- `src/app` - Pages de l'application
- `src/components` - Composants réutilisables
- `src/lib` - Utilitaires et accès aux données
- `public` - Ressources statiques (images, etc.)

## Données

L'application utilise des données statiques pour simuler une base de données, avec :
- Des catégories prédéfinies (Football, Course à pied, Tennis, Natation, Yoga, Cyclisme)
- Des activités exemples pour chaque catégorie
- Des inscriptions fictives pour démontrer le fonctionnement

## Développement local

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

## Auteur

Créé par Manus pour PMU - 2025
