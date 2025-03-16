import React from "react";
import { Brain, Zap, BarChart, LineChart } from "lucide-react";

export default function DashboardComparison() {
  return (
    <div className="p-6 bg-[#f5f5f7] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Design Comparison</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Old Design */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <BarChart className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold">Previous Design</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">Chart-based dashboard with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Multiple data visualizations</li>
              <li>Tabular data presentation</li>
              <li>Static information display</li>
              <li>Traditional dashboard layout</li>
              <li>Focus on raw data presentation</li>
            </ul>
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <div className="h-40 border border-gray-200 rounded-lg bg-white p-3">
                <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-24 bg-blue-50 rounded border border-blue-100"></div>
                  <div className="h-24 bg-green-50 rounded border border-green-100"></div>
                  <div className="h-24 bg-purple-50 rounded border border-purple-100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Design */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-bold">New AI-Focused Design</h2>
            <div className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              <span>Live Tracking</span>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">AI agent-like boxes with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pulsing tracking indicators</li>
              <li>Status-based visual cues</li>
              <li>Category-specific styling</li>
              <li>AI-generated insights</li>
              <li>Focus on actionable intelligence</li>
            </ul>
            <div className="mt-4 bg-gray-100 rounded-lg p-4">
              <div className="h-40 border border-gray-200 rounded-lg bg-white p-3 relative">
                <div className="absolute top-3 left-3 flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full mr-1.5 bg-green-500"></div>
                  <LineChart className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <div className="absolute top-3 right-3">
                  <Brain className="h-4 w-4 text-indigo-500" />
                </div>
                <div className="mt-8 px-2">
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mb-2">
                    Stocks
                  </div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
