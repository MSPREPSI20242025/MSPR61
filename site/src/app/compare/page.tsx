"use client";

import { useEffect, useState } from "react";
import { Card, CardStat } from "@/components/ui/Card";
import { api, CovidData, MpoxData, StatsSummary } from "@/services/api";
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

export default function ComparePage() {
    const [statsSummary, setStatsSummary] = useState<StatsSummary | null>(null);
    const [aggregatedCovidData, setAggregatedCovidData] = useState<CovidData[]>(
        []
    );
    const [aggregatedMpoxData, setAggregatedMpoxData] = useState<MpoxData[]>(
        []
    );
    const [selectedCountry, setSelectedCountry] = useState<string>("Global");
    const [covidTimeRange, setCovidTimeRange] = useState<number>(30); // Default to 30 days
    const [mpoxTimeRange, setMpoxTimeRange] = useState<number>(30); // Default to 30 days

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [summary, covidData, mpoxData] = await Promise.all([
                    api.getStatsSummary(),
                    api.getAllCovidData(undefined, 100_000_000),
                    api.getAllMpoxData(undefined, 100_000_000),
                ]);
                setStatsSummary(summary);

                const aggregatedCovid = aggregateByDay(covidData, "covid");
                const aggregatedMpox = aggregateByDay(mpoxData, "mpox");

                setAggregatedCovidData(aggregatedCovid);
                setAggregatedMpoxData(aggregatedMpox);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCountryChange = async (country: string) => {
        setSelectedCountry(country);
        try {
            const [covidData, mpoxData] = await Promise.all([
                api.getAllCovidData(country, 1000),
                api.getAllMpoxData(country, 1000),
            ]);

            const aggregatedCovid = aggregateByDay(covidData, "covid");
            const aggregatedMpox = aggregateByDay(mpoxData, "mpox");

            setAggregatedCovidData(aggregatedCovid);
            setAggregatedMpoxData(aggregatedMpox);
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    };

    // Function to aggregate data by day
    const aggregateByDay = (data: any[], type: "covid" | "mpox"): any[] => {
        const aggregated: { [key: string]: any } = {};

        data.forEach((item) => {
            const date = item.date.split("T")[0]; // Extract just the date part

            if (!aggregated[date]) {
                if (type === "covid") {
                    aggregated[date] = {
                        date,
                        country:
                            selectedCountry === "Global"
                                ? "Global"
                                : item.country,
                        total_cases: 0,
                        new_cases: 0,
                        active_cases: 0,
                        total_deaths: 0,
                        new_deaths: 0,
                        total_recovered: 0,
                        daily_recovered: 0,
                    };
                } else {
                    aggregated[date] = {
                        date,
                        country:
                            selectedCountry === "Global"
                                ? "Global"
                                : item.country,
                        total_cases: 0,
                        new_cases: 0,
                        total_deaths: 0,
                        new_deaths: 0,
                    };
                }
            }

            aggregated[date].total_cases += item.total_cases;
            aggregated[date].new_cases += item.new_cases;
            aggregated[date].total_deaths += item.total_deaths;
            aggregated[date].new_deaths += item.new_deaths;

            if (type === "covid") {
                aggregated[date].active_cases += item.active_cases;
                aggregated[date].total_recovered += item.total_recovered;
                aggregated[date].daily_recovered += item.daily_recovered;
            }
        });

        return Object.values(aggregated).sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    };

    // Function to filter data by time range for COVID
    const filterCovidDataByTimeRange = (data: any[], days: number): any[] => {
        if (days === 0) return data; // 0 means all data

        const refDate = new Date("2020-07-27");
        const cutoffDate = new Date(refDate);
        cutoffDate.setDate(refDate.getDate() - days);

        return data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= cutoffDate;
        });
    };

    // Function to filter data by time range for MPOX
    const filterMpoxDataByTimeRange = (data: any[], days: number): any[] => {
        if (days === 0) return data; // 0 means all data

        const refDate = new Date("2023-05-09");
        const cutoffDate = new Date(refDate);
        cutoffDate.setDate(refDate.getDate() - days);

        return data.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate >= cutoffDate;
        });
    };

    // Get filtered data for both datasets
    const filteredCovidData = filterCovidDataByTimeRange(
        aggregatedCovidData,
        covidTimeRange
    );
    const filteredMpoxData = filterMpoxDataByTimeRange(
        aggregatedMpoxData,
        mpoxTimeRange
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Compare COVID-19 & MPOX
                </h1>
                <div className="flex items-center space-x-4">
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
                        title="COVID Cases"
                        value={
                            statsSummary?.covid.total_cases.toLocaleString() ||
                            "Loading..."
                        }
                        trend="up"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="COVID Deaths"
                        value={
                            statsSummary?.covid.total_deaths.toLocaleString() ||
                            "Loading..."
                        }
                        trend="down"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="MPOX Cases"
                        value={
                            statsSummary?.mpox.total_cases.toLocaleString() ||
                            "Loading..."
                        }
                        trend="up"
                    />
                </Card>
                <Card>
                    <CardStat
                        title="MPOX Deaths"
                        value={
                            statsSummary?.mpox.total_deaths.toLocaleString() ||
                            "Loading..."
                        }
                        trend="down"
                    />
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="COVID-19 Daily Cases">
                    <div className="flex justify-end mb-2">
                        <div>
                            <label
                                htmlFor="covidTimeRange"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Time Range (COVID)
                            </label>
                            <select
                                id="covidTimeRange"
                                value={covidTimeRange}
                                onChange={(e) =>
                                    setCovidTimeRange(Number(e.target.value))
                                }
                                className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                aria-label="Select time range for COVID data">
                                <option value="0">All time</option>
                                <option value="7">Last 7 days</option>
                                <option value="14">Last 14 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                                <option value="365">Last year</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredCovidData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="new_cases"
                                    stroke="#8884d8"
                                    name="COVID New Cases"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="new_deaths"
                                    stroke="#82ca9d"
                                    name="COVID New Deaths"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="MPOX Daily Cases">
                    <div className="flex justify-end mb-2">
                        <div>
                            <label
                                htmlFor="mpoxTimeRange"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Time Range (MPOX)
                            </label>
                            <select
                                id="mpoxTimeRange"
                                value={mpoxTimeRange}
                                onChange={(e) =>
                                    setMpoxTimeRange(Number(e.target.value))
                                }
                                className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                aria-label="Select time range for MPOX data">
                                <option value="0">All time</option>
                                <option value="7">Last 7 days</option>
                                <option value="14">Last 14 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                                <option value="365">Last year</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={filteredMpoxData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="new_cases"
                                    stroke="#8884d8"
                                    name="MPOX New Cases"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="new_deaths"
                                    stroke="#82ca9d"
                                    name="MPOX New Deaths"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="COVID-19 Cases Distribution">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredCovidData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="new_cases"
                                    fill="#8884d8"
                                    name="COVID New Cases"
                                />
                                <Bar
                                    dataKey="new_deaths"
                                    fill="#82ca9d"
                                    name="COVID New Deaths"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="MPOX Cases Distribution">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={filteredMpoxData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="new_cases"
                                    fill="#8884d8"
                                    name="MPOX New Cases"
                                />
                                <Bar
                                    dataKey="new_deaths"
                                    fill="#82ca9d"
                                    name="MPOX New Deaths"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
