---
label: Authentification
icon: key
order: 200
category: API REST
---

# Authentification

L'API de données COVID et MPOX utilise un système d'authentification simple par jeton bearer pour protéger certains points d'accès. Ce guide explique comment s'authentifier avec l'API.

## Méthode d'Authentification

L'API utilise un jeton bearer statique pour l'authentification. Lors de l'envoi de requêtes aux points d'accès protégés, vous devez inclure ce jeton dans l'en-tête `Authorization`.

## Inclure le Jeton

Ajoutez l'en-tête suivant à vos requêtes HTTP :

```http
Authorization: Bearer your-api-token
```

Remplacez `your-api-token` par le véritable jeton API qui vous a été fourni.

## Exemple de Requête avec Authentification

Utilisation de curl :

```bash
curl -X GET "https://api.yourdomain.com/api/covid/data" \
  -H "Authorization: Bearer your-api-token"
```

Utilisation de JavaScript fetch :

```javascript
fetch('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

Utilisation d'Axios :

```javascript
import axios from 'axios';

axios.get('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => console.log(response.data));
```

## Réponses d'Erreur

Si l'authentification échoue, vous recevrez une réponse `401 Unauthorized` :

```json
{
  "error": "Accès refusé. Aucun jeton fourni."
}
```

Ou :

```json
{
  "error": "Jeton invalide."
}
```

## Obtenir un Jeton API

Contactez l'administrateur de l'API pour obtenir un jeton API. Chaque client ou application doit utiliser son propre jeton unique.

## Sécurité du Jeton

Pour maintenir la sécurité :

- Gardez votre jeton API confidentiel
- N'incluez pas le jeton directement dans le code côté client
- Utilisez des variables d'environnement pour stocker le jeton
- Faites une rotation périodique des jetons
- Utilisez HTTPS pour empêcher l'interception du jeton

## Variables d'Environnement

Pour les applications Node.js, stockez votre jeton dans une variable d'environnement :

```javascript
// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN;

// Utiliser le jeton dans les requêtes
fetch('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});
```

Exemple de fichier `.env` :

```
API_TOKEN=your-api-token-here
```

## Points d'Accès Publics vs. Protégés

N'oubliez pas que seuls certains points d'accès nécessitent une authentification. Les points d'accès publics peuvent être consultés sans jeton.

### Points d'Accès Publics (Pas d'Authentification Requise)

- `GET /covid/public/latest`
- `GET /covid/public/country/:country`
- `GET /covid/public/totals`
- `GET /mpox/public/summary`

### Points d'Accès Protégés (Authentification Requise)

Tous les autres points d'accès nécessitent une authentification, y compris tous les points d'accès de modification de données (POST, PUT, DELETE) et certains points d'accès de récupération de données (GET).

## Prochaines Étapes

Maintenant que vous comprenez l'authentification, vous pouvez explorer la [Référence API](/rest/api/overview.md) pour en savoir plus sur les points d'accès spécifiques.