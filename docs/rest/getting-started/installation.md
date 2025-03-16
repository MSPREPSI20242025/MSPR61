---
label: Installation
icon: download
order: 100
category: REST API
---

# Installation Guide

This guide will walk you through the process of setting up the COVID and MPOX Data API on your local environment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/covid-mpox-api.git
cd covid-mpox-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following variables:

```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
API_TOKEN="your-super-secure-api-token"
PORT=3000
```

Replace `username`, `password`, `your_database`, and `your-super-secure-api-token` with your specific values.

### 4. Set Up the Database

Create a PostgreSQL database with the name you specified in the DATABASE_URL:

```bash
createdb your_database
```

Then run the Prisma migrations to set up the schema:

```bash
npx prisma migrate dev --name init
```

### 5. Build the Project

```bash
npm run build
```

### 6. Start the Server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The API server will start at `http://localhost:3000` (or whatever port you specified in the .env file).

## Verifying the Installation

To verify that the API is running correctly, make a request to a public endpoint:

```bash
curl http://localhost:3000/api/covid/public/latest
```

You should receive a JSON response with COVID data.

## Docker Installation (Alternative)

If you prefer using Docker, you can use the following commands:

```bash
# Build the Docker image
docker build -t covid-mpox-api .

# Run the container
docker run -p 3000:3000 --env-file .env covid-mpox-api
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify that your PostgreSQL server is running
2. Check the DATABASE_URL in your .env file
3. Ensure your PostgreSQL user has the necessary permissions

### Port Already in Use

If the port is already in use:

1. Change the PORT value in your .env file
2. Stop any other services using the same port

## Next Steps

- [Learn about authentication](/rest/getting-started/authentication.md)
- [Explore the API reference](/rest/api/overview.md)