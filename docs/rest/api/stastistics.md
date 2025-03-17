---
label: Points d'Accès Statistiques
icon: graph
order: 400
category: API REST
---

# Points d'Accès Statistiques

## Points d'Accès Protégés

Ces points d'accès nécessitent une authentification.

### Obtenir le Résumé des Statistiques

Retourne les statistiques récapitulatives pour COVID et MPOX.

```
GET /stats/summary
```

#### Réponse

```json
{
  "covid": {
    "total_cases": 128963254,
    "total_deaths": 2819892
  },
  "mpox": {
    "total_cases": 86243,
    "total_deaths": 89
  }
}
```

Ce point d'accès fournit une vue d'ensemble de la situation mondiale pour les deux maladies. Il est particulièrement utile pour les tableaux de bord et les visualisations récapitulatives.

## Comprendre les Statistiques

Le point d'accès statistiques agrège les données de la date la plus récente disponible pour tous les pays. Cela signifie que :

1. Les totaux représentent la somme des données de tous les pays à la date la plus récente dans la base de données
2. Certains pays peuvent avoir des données plus récentes que d'autres
3. Les chiffres reflètent l'état de la base de données, pas nécessairement les chiffres mondiaux en temps réel

Pour les statistiques les plus précises au niveau des pays, utilisez les points d'accès spécifiques COVID et MPOX.

## Utilisation des Données Statistiques

Le point d'accès statistiques est idéal pour :

- Créer des visualisations de tableau de bord de haut niveau
- Comparer l'impact relatif de COVID-19 vs MPOX
- Surveiller les tendances mondiales dans le temps

Exemple de visualisation utilisant ces données :

```javascript
// Graphique simple comparant les cas COVID vs MPOX
function createComparisonChart(data) {
  const ctx = document.getElementById('comparison-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['COVID-19', 'MPOX'],
      datasets: [{
        label: 'Total des Cas',
        data: [data.covid.total_cases, data.mpox.total_cases],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 159, 64, 0.5)']
      }, {
        label: 'Total des Décès',
        data: [data.covid.total_deaths, data.mpox.total_deaths],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(255, 205, 86, 0.5)']
      }]
    },
    options: {
      scales: {
        y: {
          type: 'logarithmic'
        }
      }
    }
  });
}

// Récupérer les données et créer le graphique
fetch('/api/stats/summary', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => response.json())
.then(data => createComparisonChart(data));
```

## Limitation du Taux

Le point d'accès statistiques a une limite de taux plus élevée que les autres points d'accès en raison de sa nature agrégée :

- 300 requêtes par heure par jeton API