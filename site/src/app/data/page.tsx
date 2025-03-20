'use client';

import { useEffect, useState } from 'react';
import { Card, CardStat } from '@/components/ui/Card';
import { api, CovidData, MpoxData, StatsSummary } from '@/services/api';
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

export default function DataPage() {
  const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [mpoxData, setMpoxData] = useState<MpoxData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('Global');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summary, covid, mpox] = await Promise.all([
          api.getStatsSummary(),
          api.getAllCovidData(),
          api.getAllMpoxData(),
        ]);
        setStatsSummary(summary);
        setCovidData(covid);
        setMpoxData(mpox);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (country: string) => {
    setSelectedCountry(country);
    try {
      const [covid, mpox] = await Promise.all([
        api.getAllCovidData(country),
        api.getAllMpoxData(country),
      ]);
      setCovidData(covid);
      setMpoxData(mpox);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  const getTimeRangeData = (data: any[], range: '7d' | '30d' | '90d') => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return data.slice(-days);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Data</h1>
        <div className="flex gap-4">
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
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            aria-label="Select time range"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardStat
            title="COVID Cases"
            value={statsSummary?.covid.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+2.5%"
          />
        </Card>
        <Card>
          <CardStat
            title="COVID Deaths"
            value={statsSummary?.covid.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-1.2%"
          />
        </Card>
        <Card>
          <CardStat
            title="MPOX Cases"
            value={statsSummary?.mpox.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+0.8%"
          />
        </Card>
        <Card>
          <CardStat
            title="MPOX Deaths"
            value={statsSummary?.mpox.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-0.5%"
          />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="COVID-19 Daily Cases">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getTimeRangeData(covidData, selectedTimeRange)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="new_cases" stroke="#8884d8" name="New Cases" />
                <Line type="monotone" dataKey="new_deaths" stroke="#82ca9d" name="New Deaths" />
                <Line type="monotone" dataKey="daily_recovered" stroke="#ffc658" name="Recovered" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="MPOX Daily Cases">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getTimeRangeData(mpoxData, selectedTimeRange)}>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="COVID-19 Cases Distribution">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getTimeRangeData(covidData, selectedTimeRange)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new_cases" fill="#8884d8" name="New Cases" />
                <Bar dataKey="new_deaths" fill="#82ca9d" name="New Deaths" />
                <Bar dataKey="daily_recovered" fill="#ffc658" name="Recovered" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="MPOX Cases Distribution">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getTimeRangeData(mpoxData, selectedTimeRange)}>
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