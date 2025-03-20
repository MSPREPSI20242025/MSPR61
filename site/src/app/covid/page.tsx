'use client';

import { useEffect, useState } from 'react';
import { Card, CardStat } from '@/components/ui/Card';
import { api, CovidData, CovidTotals } from '@/services/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function CovidPage() {
  const [covidTotals, setCovidTotals] = useState<CovidTotals | null>(null);
  const [latestData, setLatestData] = useState<CovidData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('Global');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totals, latest] = await Promise.all([
          api.getCovidTotals(),
          api.getLatestCovidData(),
        ]);
        setCovidTotals(totals);
        setLatestData(latest);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (country: string) => {
    setSelectedCountry(country);
    try {
      const data = await api.getCovidDataByCountry(country);
      setLatestData(data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const activeCases = covidTotals 
    ? (covidTotals.total_cases - covidTotals.total_recovered).toLocaleString()
    : 'Loading...';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">COVID-19 Dashboard</h1>
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          aria-label="Select country"
        >
          <option value="Global">Global</option>
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="France">France</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardStat
            title="Total Cases"
            value={covidTotals?.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+2.5%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total Deaths"
            value={covidTotals?.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-1.2%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total Recovered"
            value={covidTotals?.total_recovered.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+3.1%"
          />
        </Card>
        <Card>
          <CardStat
            title="Active Cases"
            value={activeCases}
            trend="down"
            trendValue="-0.8%"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Daily New Cases">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latestData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new_cases" stroke="#8884d8" name="New Cases" />
                <Line type="monotone" dataKey="new_deaths" stroke="#82ca9d" name="New Deaths" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Cases Distribution">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latestData.slice(-7)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new_cases" fill="#8884d8" name="New Cases" />
                <Bar dataKey="new_deaths" fill="#82ca9d" name="New Deaths" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
} 