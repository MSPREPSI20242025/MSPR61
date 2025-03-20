"use client";

import { useEffect, useState } from "react";
import { Card, CardStat } from "@/components/ui/Card";
import { api, CovidData, CovidTotals } from "@/services/api";
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
} from "recharts";

export default function CovidPage() {
    const [covidTotals, setCovidTotals] = useState<CovidTotals | null>(null);
    const [aggregatedData, setAggregatedData] = useState<CovidData[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("Global");
    const [timeRange, setTimeRange] = useState<number>(30); // Default to 30 days

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [totals, allData] = await Promise.all([
                    api.getCovidTotals(),
                    api.getAllCovidData(undefined, 100_000_000),
                ]);
                setCovidTotals(totals);
                const aggregated = aggregateByDay(allData);
                setAggregatedData(aggregated);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCountryChange = async (country: string) => {
        setSelectedCountry(country);
        try {
            const data = await api.getAllCovidData(country, 1000);
            const aggregated = aggregateByDay(data);
            setAggregatedData(aggregated);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    // Function to aggregate data by day
    const aggregateByDay = (data: CovidData[]): CovidData[] => {
        const aggregated: { [key: string]: CovidData } = {};

        data.forEach((item) => {
            const date = item.date.split("T")[0]; // Extract just the date part

            if (!aggregated[date]) {
                aggregated[date] = {
                    date,
                    country:
                        selectedCountry === "Global" ? "Global" : item.country,
                    total_cases: 0,
                    new_cases: 0,
                    active_cases: 0,
                    total_deaths: 0,
                    new_deaths: 0,
                    total_recovered: 0,
                    daily_recovered: 0,
                };
            }

            aggregated[date].total_cases += item.total_cases;
            aggregated[date].new_cases += item.new_cases;
            aggregated[date].active_cases += item.active_cases;
            aggregated[date].total_deaths += item.total_deaths;
            aggregated[date].new_deaths += item.new_deaths;
            aggregated[date].total_recovered += item.total_recovered;
            aggregated[date].daily_recovered += item.daily_recovered;
        });

        return Object.values(aggregated).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    };

    // Function to filter data by time range
    const filterDataByTimeRange = (
        data: CovidData[],
        days: number
    ): CovidData[] => {
        if (days === 0) return data; // 0 means all data

        const today = new Date("2020-07-27");
        const cutoffDate = new Date(today);
        cutoffDate.setDate(today.getDate() - days);

        return data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= cutoffDate;
        });
    };

    // Get data filtered by the selected time range
    const filteredData = filterDataByTimeRange(aggregatedData, timeRange);

    const activeCases = covidTotals
        ? (
              Number(covidTotals.total_cases) -
              Number(covidTotals.total_recovered)
          ).toLocaleString()
        : "Loading...";

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    COVID-19 Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                    <div>
                        <label
                            htmlFor="timeRange"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Time Range
                        </label>
                        <select
                            id="timeRange"
                            value={timeRange}
                            onChange={(e) =>
                                setTimeRange(Number(e.target.value))
                            }
                            className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-label="Select time range">
                            <option value="0">All time</option>
                            <option value="7">Last 7 days</option>
                            <option value="14">Last 14 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="countrySelect"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Country
                        </label>
                        <select
                            id="countrySelect"
                            value={selectedCountry}
                            onChange={(e) =>
                                handleCountryChange(e.target.value)
                            }
                            className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-label="Select country">
                            <option value="Global">Global</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <CardStat
                        title="Total Cases"
                        value={
                            Number(covidTotals?.total_cases).toLocaleString() ||
                            "Loading..."
                        }
                        trend="up"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="Total Deaths"
                        value={
                            Number(
                                covidTotals?.total_deaths
                            ).toLocaleString() || "Loading..."
                        }
                        trend="down"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="Total Recovered"
                        value={
                            Number(
                                covidTotals?.total_recovered
                            ).toLocaleString() || "Loading..."
                        }
                        trend="up"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="Active Cases"
                        value={activeCases}
                        trend="down"
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Daily New Cases">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="new_cases"
                                    stroke="#8884d8"
                                    name="New Cases"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="new_deaths"
                                    stroke="#82ca9d"
                                    name="New Deaths"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Cases Distribution">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="new_cases"
                                    fill="#8884d8"
                                    name="New Cases"
                                />
                                <Bar
                                    dataKey="new_deaths"
                                    fill="#82ca9d"
                                    name="New Deaths"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
