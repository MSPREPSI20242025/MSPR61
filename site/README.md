# Epidemic Dashboard

A modern dashboard for visualizing COVID-19 and MPOX epidemic data.

## Features

- Modern UI with dark mode support
- Responsive design for all screen sizes
- Interactive charts using Recharts
- Country selection for data filtering
- Time range selection for data visualization
- Clean and consistent styling using Tailwind CSS
- Type-safe API integration

## Pages

1. **Overview** - Shows key statistics and trend charts
2. **COVID-19** - Detailed view of COVID-19 data with country selection
3. **MPOX** - Detailed view of MPOX data with country selection
4. **Compare** - Side-by-side comparison of COVID and MPOX data
5. **All Data** - Comprehensive view with time range selection

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm 8.0.0 or later

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_TOKEN=your-token-here
```

Replace `your-token-here` with your actual API token.

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
pnpm build
```

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- SWR for data fetching
- Axios for API requests

## API Endpoints

The dashboard uses the following API endpoints:

- `/covid/public/latest` - Get latest COVID data
- `/covid/public/country/{country}` - Get COVID data for a specific country
- `/covid/public/totals` - Get global COVID totals
- `/mpox/public/summary` - Get MPOX summary by country
- `/stats/summary` - Get statistics summary (protected endpoint)
- `/covid/data` - Get all COVID data (protected endpoint)
- `/mpox/data` - Get all MPOX data (protected endpoint)

## License

This project is licensed under the MIT License.
