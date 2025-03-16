---
label: Introduction
icon: home
order: 100
category: REST API
---

# COVID & MPOX Data API

Welcome to the official documentation for the COVID-19 and MPOX Data API. This API provides comprehensive access to epidemic data for research, analysis, and visualization purposes.

<!-- ![API Banner](/static/api-banner.png) -->

## API Features

-   **Public & Protected Endpoints**: Access basic data without authentication or use protected endpoints for complete access
-   **Comprehensive Data**: Access COVID-19 and MPOX statistics from countries around the world
-   **RESTful Design**: Simple, intuitive API design with consistent patterns
-   **JSON Responses**: All data is returned in clean, structured JSON format
-   **TypeScript Support**: Built with TypeScript for type safety and better development experience

## Quick Start

```bash
# Install dependencies
pnpm install

# Set environment variables
# Create a .env file and copy the content of .env.example to it
# Fill in the values for the environment variables

# Start the server
pnpm run dev
```

## API at a Glance

| Category   | Public Endpoints | Protected Endpoints |
| ---------- | ---------------- | ------------------- |
| COVID-19   | 3 endpoints      | 4 endpoints         |
| MPOX       | 1 endpoint       | 4 endpoints         |
| Statistics | —                | 1 endpoint          |

## Documentation Sections

-   [Getting Started](/rest/getting-started/installation.md) - Installation and basic setup
-   [Authentication](/rest/getting-started/authentication.md) - How to authenticate with the API
-   [API Reference](/rest/api/overview.md) - Detailed API endpoint documentation
-   [Guides](/rest/guides/using-the-api.md) - Practical usage examples

## Live Demo

Try the interactive API demo at [api-demo.yourdomain.com](https://api-demo.yourdomain.com)

## Support & Feedback

-   [GitHub Issues](https://github.com/yourusername/covid-mpox-api/issues)
-   [Email Support](mailto:api-support@yourdomain.com)
