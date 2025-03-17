---
label: Points d'Accès MPOX
icon: shield
order: 300
category: API REST
---

# Points d'Accès des Données MPOX

## Points d'Accès Publics

Ces points d'accès peuvent être consultés sans authentification.

### Obtenir le Résumé MPOX par Pays

Retourne les données de résumé MPOX groupées par pays.

```
GET /mpox/public/summary
```

#### Réponse

```json
[
  {
    "country": "United States",
    "latest_cases": 28995
  },
  {
    "country": "Brazil",
    "latest_cases": 10117
  },
  // Enregistrements supplémentaires...
]
```

## Points d'Accès Protégés

Ces points d'accès nécessitent une authentification.

### Obtenir Toutes les Données MPOX

Retourne les données MPOX avec filtrage optionnel par pays.

```
GET /mpox/data
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| country | query | string | Non | Filtrer par nom de pays |
| limit | query | integer | Non | Nombre maximum d'enregistrements à retourner (par défaut : 100) |

#### Exemple

```
GET /mpox/data?country=Africa&limit=10
```

#### Réponse

```json
[
  {
    "id": 1,
    "date": "2022-05-01",
    "country": "Africa",
    "total_cases": 27,
    "new_cases": 0,
    "total_deaths": 2,
    "new_deaths": 0
  },
  // Enregistrements supplémentaires...
]
```

### Ajouter de Nouvelles Données MPOX

Crée une nouvelle entrée de données MPOX.

```
POST /mpox/data
```

#### Corps de la Requête

```json
{
  "date": "2022-05-01",
  "country": "United States",
  "total_cases": 43,
  "new_cases": 12,
  "total_deaths": 2,
  "new_deaths": 0
}
```

#### Réponse

```json
{
  "success": true,
  "message": "Données ajoutées avec succès"
}
```

### Mettre à Jour les Données MPOX

Met à jour une entrée de données MPOX existante par ID.

```
PUT /mpox/data/:id
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| id | path | integer | Oui | ID de l'entrée de données MPOX |

#### Corps de la Requête

```json
{
  "date": "2022-05-01",
  "country": "United States",
  "total_cases": 43,
  "new_cases": 12,
  "total_deaths": 2,
  "new_deaths": 0
}
```

#### Réponse

```json
{
  "success": true,
  "message": "Données mises à jour avec succès"
}
```

### Supprimer les Données MPOX

Supprime une entrée de données MPOX par ID.

```
DELETE /mpox/data/:id
```

#### Paramètres

| Nom | Dans | Type | Requis | Description |
|-----|------|------|---------|-------------|
| id | path | integer | Oui | ID de l'entrée de données MPOX |

#### Réponse

```json
{
  "success": true,
  "message": "Données supprimées avec succès"
}
```

## Modèle de Données

### Modèle de Données MPOX

```typescript
interface MpoxData {
  id: number;           // Identifiant unique
  date: string;         // Date au format AAAA-MM-JJ
  country: string;      // Nom du pays
  total_cases: number;  // Total des cas confirmés
  new_cases: number;    // Nouveaux cas pour cette date
  total_deaths: number; // Total des décès
  new_deaths: number;   // Nouveaux décès pour cette date
}
```

## Notes sur les Données MPOX

Le jeu de données MPOX diffère du jeu de données COVID à plusieurs égards importants :

1. **Couverture** : Les données MPOX sont disponibles pour moins de pays que les données COVID
2. **Champs** : Les données MPOX n'incluent pas de statistiques de guérison
3. **Granularité** : Les données MPOX peuvent être rapportées avec moins de fréquence que les données COVID

Lors de l'intégration des données MPOX dans vos applications, tenez compte de ces différences et assurez-vous que votre code les gère de manière appropriée.