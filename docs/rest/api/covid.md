---
label: Points d'Accès COVID
icon: virus
order: 200
category: API REST
---

# Points d'Accès des Données COVID-19

## Points d'Accès Publics

Ces points d'accès peuvent être consultés sans authentification.

### Obtenir les Dernières Données COVID

Retourne les entrées de données COVID les plus récentes (limité à 10 enregistrements).

```
GET /covid/public/latest
```

#### Réponse

```json
[
  {
    "id": 1,
    "date": "2023-03-15",
    "country": "United States",
    "total_cases": 32580458,
    "new_cases": 58480,
    "active_cases": 6964527,
    "total_deaths": 582114,
    "new_deaths": 585,
    "total_recovered": 25033817,
    "daily_recovered": 38170
  },
  // Enregistrements supplémentaires...
]
```

### Obtenir les Données COVID par Pays

Retourne les données COVID pour un pays spécifique (limité aux 30 derniers jours).

```
GET /covid/public/country/:country
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| country | path | string | Oui | Nom du pays |

#### Exemple

```
GET /covid/public/country/United%20States
```

#### Réponse

```json
[
  {
    "id": 1,
    "date": "2023-03-15",
    "country": "United States",
    "total_cases": 32580458,
    "new_cases": 58480,
    "active_cases": 6964527,
    "total_deaths": 582114,
    "new_deaths": 585,
    "total_recovered": 25033817,
    "daily_recovered": 38170
  },
  // Enregistrements supplémentaires...
]
```

### Obtenir les Totaux Mondiaux COVID

Retourne les totaux mondiaux COVID des données les plus récentes.

```
GET /covid/public/totals
```

#### Réponse

```json
{
  "total_cases": 128963254,
  "total_deaths": 2819892,
  "total_recovered": 104122331
}
```

## Points d'Accès Protégés

Ces points d'accès nécessitent une authentification.

### Obtenir Toutes les Données COVID

Retourne les données COVID avec filtrage optionnel par pays.

```
GET /covid/data
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| country | query | string | Non | Filtrer par nom de pays |
| limit | query | integer | Non | Nombre maximum d'enregistrements à retourner (par défaut : 100) |

#### Exemple

```
GET /covid/data?country=Spain&limit=10
```

#### Réponse

```json
[
  {
    "id": 42,
    "date": "2023-03-15",
    "country": "Spain",
    "total_cases": 3247738,
    "new_cases": 4838,
    "active_cases": 798453,
    "total_deaths": 75783,
    "new_deaths": 35,
    "total_recovered": 2373502,
    "daily_recovered": 3291
  },
  // Enregistrements supplémentaires...
]
```

### Ajouter de Nouvelles Données COVID

Crée une nouvelle entrée de données COVID.

```
POST /covid/data
```

#### Corps de la Requête

```json
{
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
```

#### Réponse

```json
{
  "success": true,
  "message": "Données ajoutées avec succès"
}
```

### Mettre à Jour les Données COVID

Met à jour une entrée de données COVID existante par ID.

```
PUT /covid/data/:id
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| id | path | integer | Oui | ID de l'entrée de données COVID |

#### Corps de la Requête

```json
{
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
```

#### Réponse

```json
{
  "success": true,
  "message": "Données mises à jour avec succès"
}
```

### Supprimer les Données COVID

Supprime une entrée de données COVID par ID.

```
DELETE /covid/data/:id
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| id | path | integer | Oui | ID de l'entrée de données COVID |

#### Réponse

```json
{
  "success": true,
  "message": "Données supprimées avec succès"
}
```

## Modèle de Données

### Modèle de Données COVID

```typescript
interface CovidData {
  id: number;            // Identifiant unique
  date: string;          // Date au format AAAA-MM-JJ
  country: string;       // Nom du pays
  total_cases: number;   // Total des cas confirmés
  new_cases: number;     // Nouveaux cas pour cette date
  active_cases: number;  // Cas actifs actuels
  total_deaths: number;  // Total des décès
  new_deaths: number;    // Nouveaux décès pour cette date
  total_recovered: number; // Total des cas récupérés
  daily_recovered: number; // Nouveaux récupérés pour cette date
}
```