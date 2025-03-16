---
label: Using the API
icon: code
order: 100
category: REST API
---

# Using the API

This guide demonstrates how to interact with the COVID and MPOX Data API using various programming languages and tools.

## Basic Usage Patterns

Regardless of the language or library you use, working with the API follows these basic patterns:

1. For public endpoints, make a direct GET request
2. For protected endpoints, include the bearer token in the Authorization header
3. Parse the JSON response
4. Handle any errors

## Example: Fetching COVID Data for a Country

### Using curl

```bash
# Public endpoint - no authentication required
curl -X GET "https://api.yourdomain.com/api/covid/public/country/United%20States"

# Protected endpoint - authentication required
curl -X GET "https://api.yourdomain.com/api/covid/data?country=United%20States" \
  -H "Authorization: Bearer your-api-token"
```

### Using JavaScript (fetch)

```javascript
// Public endpoint
fetch('https://api.yourdomain.com/api/covid/public/country/United%20States')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Protected endpoint
fetch('https://api.yourdomain.com/api/covid/data?country=United%20States', {
  headers: {
    'Authorization': 'Bearer your-api-token'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Python (requests)

```python
import requests

# Public endpoint
response = requests.get('https://api.yourdomain.com/api/covid/public/country/United%20States')
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")

# Protected endpoint
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
    print(f"Error: {response.status_code}")
```

## Creating a New Record

### Using JavaScript (fetch)

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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Using Python (requests)

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
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Building a Simple Dashboard

Here's a complete example of building a simple COVID dashboard using HTML, CSS, and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COVID-19 Dashboard</title>
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
        <h1>COVID-19 Dashboard</h1>
        
        <div class="card">
            <h2>Global Totals</h2>
            <div class="stats" id="global-stats">
                <div class="stat-card">
                    <h3>Total Cases</h3>
                    <div class="number" id="total-cases">Loading...</div>
                </div>
                <div class="stat-card">
                    <h3>Total Deaths</h3>
                    <div class="number" id="total-deaths">Loading...</div>
                </div>
                <div class="stat-card">
                    <h3>Total Recovered</h3>
                    <div class="number" id="total-recovered">Loading...</div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>Country Data</h2>
            <select id="country-selector">
                <option value="">Select a country</option>
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

## Common Error Handling

Here's how to handle common API errors:

```javascript
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (response.status === 401) {
        throw new Error('Authentication required. Please check your API token.');
      }
      if (response.status === 404) {
        throw new Error('Resource not found. Please check the URL.');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}

// Usage
fetchData('https://api.yourdomain.com/api/covid/public/latest')
  .then(data => {
    // Process data
    console.log(data);
  })
  .catch(error => {
    // Display user-friendly error
    console.error('Error:', error.message);
  });
```

## Rate Limiting Considerations

The API implements rate limiting to ensure fair usage. If you exceed the rate limits, you'll receive a `429 Too Many Requests` response.

To handle rate limiting:

1. Cache responses when possible
2. Implement exponential backoff for retries
3. Batch requests when fetching large amounts of data

Example rate limit handling:

```javascript
function fetchWithRetry(url, options = {}, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (retryCount) => {
      fetch(url, options)
        .then(response => {
          if (response.status === 429 && retryCount < maxRetries) {
            // Get retry-after header, default to exponential backoff
            const retryAfter = response.headers.get('Retry-After') || Math.pow(2, retryCount) * 1000;
            console.log(`Rate limited. Retrying in ${retryAfter}ms...`);
            setTimeout(() => attempt(retryCount + 1), retryAfter);
          } else if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            resolve(response.json());
          }
        })
        .catch(error => {
          if (retryCount < maxRetries) {
            console.log(`Error: ${error.message}. Retrying...`);
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

## Next Steps

- Explore the full [API Reference](/rest/api/overview.md)