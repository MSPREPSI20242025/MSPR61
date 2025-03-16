---
label: MPOX Endpoints
icon: shield
order: 300
category: REST API
---

# MPOX Data Endpoints

## Public Endpoints

These endpoints can be accessed without authentication.

### Get MPOX Summary by Country

Returns MPOX summary data grouped by country.

```
GET /mpox/public/summary
```

#### Response

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
  // Additional records...
]
```

## Protected Endpoints

These endpoints require authentication.

### Get All MPOX Data

Returns MPOX data with optional filtering by country.

```
GET /mpox/data
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| country | query | string | No | Filter by country name |
| limit | query | integer | No | Maximum number of records to return (default: 100) |

#### Example

```
GET /mpox/data?country=Africa&limit=10
```

#### Response

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
  // Additional records...
]
```

### Add New MPOX Data

Creates a new MPOX data entry.

```
POST /mpox/data
```

#### Request Body

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

#### Response

```json
{
  "success": true,
  "message": "Data added successfully"
}
```

### Update MPOX Data

Updates an existing MPOX data entry by ID.

```
PUT /mpox/data/:id
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| id | path | integer | Yes | ID of the MPOX data entry |

#### Request Body

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

#### Response

```json
{
  "success": true,
  "message": "Data updated successfully"
}
```

### Delete MPOX Data

Deletes a MPOX data entry by ID.

```
DELETE /mpox/data/:id
```

#### Parameters

| Name | In | Type | Required | Description |
|------|----|----|----------|-------------|
| id | path | integer | Yes | ID of the MPOX data entry |

#### Response

```json
{
  "success": true,
  "message": "Data deleted successfully"
}
```

## Data Model

### MPOX Data Model

```typescript
interface MpoxData {
  id: number;           // Unique identifier
  date: string;         // Date in YYYY-MM-DD format
  country: string;      // Country name
  total_cases: number;  // Total confirmed cases
  new_cases: number;    // New cases on this date
  total_deaths: number; // Total deaths
  new_deaths: number;   // New deaths on this date
}
```

## Notes on MPOX Data

The MPOX dataset differs from the COVID dataset in several important ways:

1. **Coverage**: MPOX data is available for fewer countries compared to COVID data
2. **Fields**: MPOX data does not include recovery statistics
3. **Granularity**: MPOX data may be reported with less frequency than COVID data

When integrating MPOX data into your applications, be aware of these differences and ensure your code handles them appropriately.