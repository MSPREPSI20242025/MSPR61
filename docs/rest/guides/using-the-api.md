---
label: Utilisation de l'API
icon: code
order: 100
category: API REST
---

# Utilisation de l'API

Ce guide montre comment interagir avec l'API de données COVID et MPOX en utilisant différents langages de programmation et outils.

## Modèles d'Utilisation de Base

Quel que soit le langage ou la bibliothèque que vous utilisez, l'utilisation de l'API suit ces modèles de base :

1. Pour les points d'accès publics, faites une requête GET directe
2. Pour les points d'accès protégés, incluez le jeton bearer dans l'en-tête Authorization
3. Analysez la réponse JSON
4. Gérez les erreurs éventuelles

## Exemple : Récupération des Données COVID pour un Pays

### Utilisation de curl

```bash
# Point d'accès public - pas d'authentification requise
curl -X GET "https://api.yourdomain.com/api/covid/public/country/United%20States"

# Point d'accès protégé - authentification requise
curl -X GET "https://api.yourdomain.com/api/covid/data?country=United%20States" \
  -H "Authorization: Bearer your-api-token"
```

### Utilisation de JavaScript (fetch)

```javascript
// Point d'accès public
fetch('https://api.yourdomain.com/api/covid/public/country/United%20States')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));

// Point d'accès protégé
fetch('https://api.yourdomain.com/api/covid/data?country=United%20States', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
```

### Utilisation de Python (requests)

```python
import requests

# Point d'accès public
response = requests.get('https://api.yourdomain.com/api/covid/public/country/United%20States')
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Erreur : {response.status_code}")

# Point d'accès protégé
headers = {'Authorization': 'Bearer your-api-token'}
response = requests.get(
    'https://api.yourdomain.com/api/covid/data',
    params={'country': 'United States'},
    headers=headers
)
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Erreur : {response.status_code}")
```

## Création d'un Nouveau Enregistrement

### Utilisation de JavaScript (fetch)

```javascript
const newCovidData = {
  date: "2023-03-16",
  country: "United States",
  total_cases: 32638938,
  new_cases: 58480,
  active_cases: 7023007,
  total_deaths: 582699,
  new_deaths: 585,
  total_recovered: 25033232,
  daily_recovered: 38170
};

fetch('https://api.yourdomain.com/api/covid/data', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newCovidData)
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
```

### Utilisation de Python (requests)

```python
import requests
import json

new_covid_data = {
  "date": "2023-03-16",
  "country": "United States",
  "total_cases": 32638938,
  "new_cases": 58480,
  "active_cases": 7023007,
  "total_deaths": 582699,
  "new_deaths": 585,
  "total_recovered": 25033232,
  "daily_recovered": 38170
}

headers = {
    'Authorization': 'Bearer your-api-token',
    'Content-Type': 'application/json'
}

response = requests.post(
    'https://api.yourdomain.com/api/covid/data',
    headers=headers,
    data=json.dumps(new_covid_data)
)

if response.status_code == 201:
    data = response.json()
    print(data)
else:
    print(f"Erreur : {response.status_code}")
    print(response.text)
```

## Création d'un Tableau de Bord Simple

Voici un exemple complet de création d'un tableau de bord COVID simple utilisant HTML, CSS et JavaScript :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de Bord COVID-19</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .card {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .stat-card {
            background-color: white;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            padding: 20px;
            text-align: center;
        }
        .number {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }
        .chart-container {
            height: 400px;
        }
        select {
            padding: 8px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Tableau de Bord COVID-19</h1>
        
        <div class="card">
            <h2>Totaux Mondiaux</h2>
            <div class="stats" id="global-stats">
                <div class="stat-card">
                    <h3>Total des Cas</h3>
                    <div class="number" id="total-cases">Chargement...</div>
                </div>
                <div class="stat-card">
                    <h3>Total des Décès</h3>
                    <div class="number" id="total-deaths">Chargement...</div>
                </div>
                <div class="stat-card">
                    <h3>Total des Guérisons</h3>
                    <div class="number" id="total-recovered">Chargement...</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>Données par Pays</h2>
            <select id="country-selector">
                <option value="">Sélectionnez un pays</option>
            </select>
            <div class="chart-container">
                <canvas id="cases-chart"></canvas>
            </div>
        </div>
    </div>

    <script>
        // Format numbers with commas
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        
        // Fetch global totals
        fetch('https://api.yourdomain.com/api/covid/public/totals')
            .then(response => response.json())
            .then(data => {
                document.getElementById('total-cases').textContent = formatNumber(data.total_cases);
                document.getElementById('total-deaths').textContent = formatNumber(data.total_deaths);
                document.getElementById('total-recovered').textContent = formatNumber(data.total_recovered);
            })
            .catch(error => console.error('Error:', error));
        
        // Get list of countries for dropdown
        fetch('https://api.yourdomain.com/api/covid/public/latest')
            .then(response => response.json())
            .then(data => {
                const countries = [...new Set(data.map(item => item.country))].sort();
                const selector = document.getElementById('country-selector');
                
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    selector.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
        
        // Chart for country data
        let casesChart;
        
        document.getElementById('country-selector').addEventListener('change', function() {
            const country = this.value;
            if (!country) return;
            
            fetch(`https://api.yourdomain.com/api/covid/public/country/${encodeURIComponent(country)}`)
                .then(response => response.json())
                .then(data => {
                    // Sort data by date
                    data.sort((a, b) => new Date(a.date) - new Date(b.date));
                    
                    const dates = data.map(item => item.date);
                    const cases = data.map(item => item.total_cases);
                    const newCases = data.map(item => item.new_cases);
                    
                    if (casesChart) {
                        casesChart.destroy();
                    }
                    
                    const ctx = document.getElementById('cases-chart').getContext('2d');
                    casesChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: dates,
                            datasets: [
                                {
                                    label: 'Total Cases',
                                    data: cases,
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    yAxisID: 'y',
                                },
                                {
                                    label: 'New Cases',
                                    data: newCases,
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    yAxisID: 'y1',
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    title: {
                                        display: true,
                                        text: 'Total Cases'
                                    }
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    title: {
                                        display: true,
                                        text: 'New Cases'
                                    },
                                    grid: {
                                        drawOnChartArea: false
                                    }
                                }
                            }
                        }
                    });
                })
                .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
```

## Gestion des Erreurs Courantes

Voici comment gérer les erreurs courantes de l'API :

```javascript
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.status === 401) {
        throw new Error('Authentification requise. Veuillez vérifier votre jeton API.');
      }
      if (response.status === 404) {
        throw new Error('Ressource non trouvée. Veuillez vérifier l\'URL.');
      }
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
      }
      return response.json();
    });
}

// Utilisation
fetchData('https://api.yourdomain.com/api/covid/public/latest')
  .then(data => {
    // Traitement des données
    console.log(data);
  })
  .catch(error => {
    // Affichage de l'erreur de manière conviviale
    console.error('Erreur:', error.message);
  });
```

## Considérations sur la Limitation de Débit

L'API implémente une limitation de débit pour assurer une utilisation équitable. Si vous dépassez les limites de débit, vous recevrez une réponse `429 Too Many Requests`.

Pour gérer la limitation de débit :

1. Mettez en cache les réponses lorsque c'est possible
2. Implémentez un délai exponentiel pour les nouvelles tentatives
3. Regroupez les requêtes lors de la récupération de grandes quantités de données

Exemple de gestion de la limitation de débit :

```javascript
function fetchWithRetry(url, options = {}, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (retryCount) => {
      fetch(url, options)
        .then(response => {
          if (response.status === 429 && retryCount < maxRetries) {
            // Récupération de l'en-tête retry-after, par défaut délai exponentiel
            const retryAfter = response.headers.get('Retry-After') || Math.pow(2, retryCount) * 1000;
            console.log(`Limite de débit atteinte. Nouvelle tentative dans ${retryAfter}ms...`);
            setTimeout(() => attempt(retryCount + 1), retryAfter);
          } else if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
          } else {
            resolve(response.json());
          }
        })
        .catch(error => {
          if (retryCount < maxRetries) {
            console.log(`Erreur : ${error.message}. Nouvelle tentative...`);
            setTimeout(() => attempt(retryCount + 1), Math.pow(2, retryCount) * 1000);
          } else {
            reject(error);
          }
        });
    };
    
    attempt(0);
  });
}
```

## Prochaines Étapes

- Explorez la [Référence complète de l'API](/rest/api/overview.md)