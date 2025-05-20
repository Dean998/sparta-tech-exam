"use client";

import { useEffect, useState } from "react";
import { InsightsData } from "@/types/insights";

export default function InsightsPage() {
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch("/api/insights");
        if (!response.ok) {
          throw new Error("Failed to fetch insights");
        }
        const data = await response.json();
        setInsights(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Loading insights...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-red-600">
            Error: {error}
          </h1>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">No insights available</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trading Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Total Volume by Commodity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Total Volume by Commodity
            </h2>
            <div className="space-y-2">
              {Object.entries(insights.totalVolumeByCommodity || {}).length >
              0 ? (
                Object.entries(insights.totalVolumeByCommodity).map(
                  ([commodity, volume]) => (
                    <div
                      key={commodity}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{commodity}</span>
                      <span className="text-gray-600">
                        {volume.toLocaleString()}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">No volume data available</p>
              )}
            </div>
          </div>

          {/* Average Price by Commodity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Average Price by Commodity
            </h2>
            <div className="space-y-2">
              {Object.entries(insights.averagePriceByCommodity || {}).length >
              0 ? (
                Object.entries(insights.averagePriceByCommodity).map(
                  ([commodity, price]) => (
                    <div
                      key={commodity}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium">{commodity}</span>
                      <span className="text-gray-600">${price.toFixed(2)}</span>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500">No price data available</p>
              )}
            </div>
          </div>

          {/* Top Traders by Volume */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              Top Traders by Volume
            </h2>
            <div className="overflow-x-auto">
              {insights.topTradersByVolume &&
              insights.topTradersByVolume.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trader ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Volume
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {insights.topTradersByVolume.map((trader) => (
                      <tr key={trader.traderId}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {trader.traderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {trader.volume.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No trader data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
