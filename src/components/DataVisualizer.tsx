import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { PeptideData } from '../types/PeptideData';

interface DataVisualizerProps {
  data: PeptideData[];
}

export function DataVisualizer({ data }: DataVisualizerProps) {
  const evidenceDistribution = data.reduce(
    (acc: Record<string, number>, curr) => {
      acc[curr.Evidence] = (acc[curr.Evidence] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = Object.entries(evidenceDistribution).map(
    ([name, value]) => ({
      name,
      count: value,
    })
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Evidence Distribution</h2>
      <div className="w-full overflow-x-auto">
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}
