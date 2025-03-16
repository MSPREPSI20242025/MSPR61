---
label: Statistics Endpoints
icon: graph
order: 400
category: REST API
---

# Statistics Endpoints

## Protected Endpoints

These endpoints require authentication.

### Get Statistics Summary

Returns summary statistics for both COVID and MPOX.

```
GET /stats/summary
```

#### Response

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

This endpoint provides a high-level overview of the global situation for both diseases. It's particularly useful for dashboards and summary visualizations.

## Understanding the Statistics

The statistics endpoint aggregates data from the latest available date for all countries. This means:

1. The totals represent the sum of all country data from the most recent date in the database
2. Some countries may have more recent data than others
3. The numbers reflect the state of the database, not necessarily real-time global figures

For the most accurate country-level statistics, use the specific COVID and MPOX endpoints.

## Using Statistics Data

The statistics endpoint is ideal for:

- Creating high-level dashboard visualizations
- Comparing the relative impact of COVID-19 vs. MPOX
- Monitoring global trends over time

Example visualization using this data:

```javascript
// Simple chart comparing COVID vs MPOX cases
function createComparisonChart(data) {
  const ctx = document.getElementById('comparison-chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['COVID-19', 'MPOX'],
      datasets: [{
        label: 'Total Cases',
        data: [data.covid.total_cases, data.mpox.total_cases],
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 159, 64, 0.5)']
      }, {
        label: 'Total Deaths',
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

// Fetch data and create chart
fetch('/api/stats/summary', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
.then(response => response.json())
.then(data => createComparisonChart(data));
```

## Rate Limiting

The statistics endpoint has a higher rate limit than other endpoints due to its aggregated nature:

- 300 requests per hour per API token