'use client';

import { useEffect, useState } from 'react';
import { Card, CardStat } from '@/components/ui/Card';
import { api, CovidTotals, StatsSummary } from '@/services/api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Home() {
  const [covidTotals, setCovidTotals] = useState<CovidTotals | null>(null);
  const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
  const [latestCovidData, setLatestCovidData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totals, summary, latest] = await Promise.all([
          api.getCovidTotals(),
          api.getStatsSummary(),
          api.getLatestCovidData(),
        ]);
        setCovidTotals(totals);
        setStatsSummary(summary);
        setLatestCovidData(latest);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardStat
            title="Total COVID Cases"
            value={covidTotals?.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+2.5%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total COVID Deaths"
            value={covidTotals?.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-1.2%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total MPOX Cases"
            value={statsSummary?.mpox.total_cases.toLocaleString() || 'Loading...'}
            trend="up"
            trendValue="+0.8%"
          />
        </Card>
        <Card>
          <CardStat
            title="Total MPOX Deaths"
            value={statsSummary?.mpox.total_deaths.toLocaleString() || 'Loading...'}
            trend="down"
            trendValue="-0.5%"
          />
        </Card>
      </div>

      <Card title="COVID-19 Cases Trend">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latestCovidData}>
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
  );
}
