---
label: API REST
icon: home
order: 100
category: API REST
---

# API de Données COVID & MPOX

Bienvenue dans la documentation officielle de l'API de données COVID-19 et MPOX. Cette API fournit un accès complet aux données épidémiques à des fins de recherche, d'analyse et de visualisation.

<!-- ![API Banner](/static/api-banner.png) -->

## Fonctionnalités de l'API

-   **Points d'accès Publics & Protégés** : Accédez aux données de base sans authentification ou utilisez les points d'accès protégés pour un accès complet
-   **Données Complètes** : Accédez aux statistiques COVID-19 et MPOX de pays du monde entier
-   **Conception RESTful** : Design d'API simple et intuitif avec des modèles cohérents
-   **Réponses JSON** : Toutes les données sont retournées dans un format JSON propre et structuré
-   **Support TypeScript** : Construit avec TypeScript pour la sécurité des types et une meilleure expérience de développement

## Démarrage Rapide

```bash
# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
# Créer un fichier .env et copier le contenu de .env.example
# Remplir les valeurs des variables d'environnement

# Démarrer le serveur
pnpm run dev
```

## Aperçu de l'API

| Catégorie  | Points d'accès Publics | Points d'accès Protégés |
| ---------- | ---------------------- | ----------------------- |
| COVID-19   | 3 points d'accès      | 4 points d'accès       |
| MPOX       | 1 point d'accès       | 4 points d'accès       |
| Statistiques | —                    | 1 point d'accès        |

## Sections de la Documentation

-   [Pour Commencer](/rest/getting-started/installation.md) - Installation et configuration de base
-   [Authentification](/rest/getting-started/authentication.md) - Comment s'authentifier avec l'API
-   [Référence API](/rest/api/overview.md) - Documentation détaillée des points d'accès API
-   [Guides](/rest/guides/using-the-api.md) - Exemples pratiques d'utilisation

## Démo en Direct

Essayez la démo interactive de l'API sur [api-demo.yourdomain.com](https://api-demo.yourdomain.com)

## Support & Retour d'expérience

-   [Issues GitHub](https://github.com/yourusername/covid-mpox-api/issues)
-   [Support par Email](mailto:api-support@yourdomain.com)
