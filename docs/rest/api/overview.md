---
label: Overview
icon: checklist
order: 100
category: REST API
---

# API Overview

The COVID and MPOX Data API provides a collection of endpoints to access and manage epidemic data. The API is divided into public endpoints that can be accessed without authentication and protected endpoints that require a bearer token.

## Base URL

All API endpoints are relative to the base URL:

```
https://api.yourdomain.com/api
```

## Authentication

Protected endpoints require authentication using a bearer token in the Authorization header:

```http
Authorization: Bearer your-api-token
```

See the [Authentication Guide](/rest/getting-started/authentication.md) for more details.

## Response Format

All API responses are returned in JSON format. The basic structure depends on the type of request:

### Success Responses

Successful data retrieval operations return either a single object or an array of objects:

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

Successful write operations return a success message:

```json
{
  "success": true,
  "message": "Data added successfully"
}
```

### Error Responses

Error responses include an error message:

```json
{
  "error": "Access denied. No token provided."
}
```

## HTTP Status Codes

The API uses standard HTTP status codes:

| Code | Description |
|------|-------------|
| 200  | Success (GET, PUT, DELETE) |
| 201  | Created (POST) |
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Server Error |

## API Categories

### Public Endpoints

Public endpoints are accessible without authentication:

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/covid/public/latest](/rest/api/covid.md#get-latest-covid-data) | GET | Get latest COVID data |
| [/covid/public/country/:country](/rest/api/covid.md#get-covid-data-by-country) | GET | Get COVID data by country |
| [/covid/public/totals](/rest/api/covid.md#get-covid-global-totals) | GET | Get global COVID totals |
| [/mpox/public/summary](/rest/api/mpox.md#get-mpox-summary-by-country) | GET | Get MPOX summary by country |

### Protected Endpoints

Protected endpoints require authentication:

| Endpoint | Method | Description |
|----------|--------|-------------|
| [/covid/data](/rest/api/covid.md#get-all-covid-data) | GET | Get all COVID data |
| [/covid/data](/rest/api/covid.md#add-new-covid-data) | POST | Add new COVID data |
| [/covid/data/:id](/rest/api/covid.md#update-covid-data) | PUT | Update COVID data |
| [/covid/data/:id](/rest/api/covid.md#delete-covid-data) | DELETE | Delete COVID data |
| [/mpox/data](/rest/api/mpox.md#get-all-mpox-data) | GET | Get all MPOX data |
| [/mpox/data](/rest/api/mpox.md#add-new-mpox-data) | POST | Add new MPOX data |
| [/mpox/data/:id](/rest/api/mpox.md#update-mpox-data) | PUT | Update MPOX data |
| [/mpox/data/:id](/rest/api/mpox.md#delete-mpox-data) | DELETE | Delete MPOX data |
| [/stats/summary](/rest/api/statistics.md#get-statistics-summary) | GET | Get statistics summary |

## Interactive Documentation

For a fully interactive API reference, use our [API Playground](https://api.yourdomain.com/api/docs) powered by Redoc.