---
label: Authentication
icon: key
order: 200
category: REST API
---

# Authentication

The COVID and MPOX Data API uses a simple bearer token authentication system to protect certain endpoints. This guide explains how to authenticate with the API.

## Authentication Method

The API uses a static bearer token for authentication. When making requests to protected endpoints, you must include this token in the `Authorization` header.

## Including the Token

Add the following header to your HTTP requests:

```http
Authorization: Bearer your-api-token
```

Replace `your-api-token` with the actual API token provided to you.

## Example Request with Authentication

Using curl:

```bash
curl -X GET "https://api.yourdomain.com/api/covid/data" \
  -H "Authorization: Bearer your-api-token"
```

Using JavaScript fetch:

```javascript
fetch('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

Using Axios:

```javascript
import axios from 'axios';

axios.get('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => console.log(response.data));
```

## Error Responses

If authentication fails, you will receive a `401 Unauthorized` response:

```json
{
  "error": "Access denied. No token provided."
}
```

Or:

```json
{
  "error": "Invalid token."
}
```

## Obtaining an API Token

Contact the API administrator to obtain an API token. Each client or application should use its own unique token.

## Token Security

To maintain security:

- Keep your API token confidential
- Don't include the token directly in client-side code
- Use environment variables to store the token
- Rotate tokens periodically
- Use HTTPS to prevent token interception

## Environment Variables

For Node.js applications, store your token in an environment variable:

```javascript
// Load environment variables from .env file
require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN;

// Use the token in requests
fetch('https://api.yourdomain.com/api/covid/data', {
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`
  }
});
```

Example `.env` file:

```
API_TOKEN=your-api-token-here
```

## Public vs. Protected Endpoints

Remember that only certain endpoints require authentication. Public endpoints can be accessed without a token.

### Public Endpoints (No Authentication Required)

- `GET /covid/public/latest`
- `GET /covid/public/country/:country`
- `GET /covid/public/totals`
- `GET /mpox/public/summary`

### Protected Endpoints (Authentication Required)

All other endpoints require authentication, including all data modification endpoints (POST, PUT, DELETE) and some data retrieval endpoints (GET).

## Next Steps

Now that you understand authentication, you can explore the [API Reference](/rest/api/overview.md) to learn about specific endpoints.