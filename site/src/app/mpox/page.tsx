'use client';

import { useEffect, useState } from 'react';
import { Card, CardStat } from '@/components/ui/Card';
import { api, MpoxData, StatsSummary } from '@/services/api';
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

export default function MpoxPage() {
  const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
  const [latestData, setLatestData] = useState<MpoxData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('Global');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summary, latest] = await Promise.all([
          api.getStatsSummary(),
          api.getMpoxSummary(),
        ]);
        setStatsSummary(summary);
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
      const data = await api.getAllMpoxData(country);
      setLatestData(data);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">MPOX Dashboard</h1>
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
            value={statsSummary?.mpox.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+0.8%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total Deaths"
            value={statsSummary?.mpox.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-0.5%"
          />
        </Card>
        <Card>
          <CardStat
            title="New Cases"
            value={latestData[0]?.new_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+0.3%"
          />
        </Card>
        <Card>
          <CardStat
            title="New Deaths"
            value={latestData[0]?.new_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-0.2%"
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