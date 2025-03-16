---
label: COVID Endpoints
icon: virus
order: 200
category: REST API
---

# COVID-19 Data Endpoints

## Public Endpoints

These endpoints can be accessed without authentication.

### Get Latest COVID Data

Returns the most recent COVID data entries (limited to 10 records).

```
GET /covid/public/latest
```

#### Response

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
  // Additional records...
]
```

### Get COVID Data by Country

Returns COVID data for a specific country (limited to last 30 days).

```
GET /covid/public/country/:country
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| country | path | string | Yes | Country name |

#### Example

```
GET /covid/public/country/United%20States
```

#### Response

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
  // Additional records...
]
```

### Get COVID Global Totals

Returns global COVID totals from the most recent data.

```
GET /covid/public/totals
```

#### Response

```json
{
  "total_cases": 128963254,
  "total_deaths": 2819892,
  "total_recovered": 104122331
}
```

## Protected Endpoints

These endpoints require authentication.

### Get All COVID Data

Returns COVID data with optional filtering by country.

```
GET /covid/data
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| country | query | string | No | Filter by country name |
| limit | query | integer | No | Maximum number of records to return (default: 100) |

#### Example

```
GET /covid/data?country=Spain&limit=10
```

#### Response

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
  // Additional records...
]
```

### Add New COVID Data

Creates a new COVID data entry.

```
POST /covid/data
```

#### Request Body

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

#### Response

```json
{
  "success": true,
  "message": "Data added successfully"
}
```

### Update COVID Data

Updates an existing COVID data entry by ID.

```
PUT /covid/data/:id
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| id | path | integer | Yes | ID of the COVID data entry |

#### Request Body

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

#### Response

```json
{
  "success": true,
  "message": "Data updated successfully"
}
```

### Delete COVID Data

Deletes a COVID data entry by ID.

```
DELETE /covid/data/:id
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| id | path | integer | Yes | ID of the COVID data entry |

#### Response

```json
{
  "success": true,
  "message": "Data deleted successfully"
}
```

## Data Model

### COVID Data Model

```typescript
interface CovidData {
  id: number;            // Unique identifier
  date: string;          // Date in YYYY-MM-DD format
  country: string;       // Country name
  total_cases: number;   // Total confirmed cases
  new_cases: number;     // New cases on this date
  active_cases: number;  // Currently active cases
  total_deaths: number;  // Total deaths
  new_deaths: number;    // New deaths on this date
  total_recovered: number; // Total recovered cases
  daily_recovered: number; // New recoveries on this date
}
```