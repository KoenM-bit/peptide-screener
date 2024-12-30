import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface CancerExpressionData {
  tumorType: string;
  expression: number;
}

interface CancerExpressionChartProps {
  data?: Record<string, number>;
}

export function CancerExpressionChart({ data }: CancerExpressionChartProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-rose-500" />
          <h3 className="text-lg font-semibold">Cancer Expression Profile</h3>
        </div>
        <div className="text-center text-gray-500 py-4">
          No cancer expression data available
        </div>
      </div>
    );
  }

  const chartData: CancerExpressionData[] = Object.entries(data)
    .map(([tumorType, expression]) => ({
      tumorType: formatTumorType(tumorType),
      expression: expression
    }))
    .sort((a, b) => b.expression - a.expression);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-rose-500" />
        <h3 className="text-lg font-semibold">Cancer Expression Profile</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis
              dataKey="tumorType"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ 
                value: 'Expression Level (TPM)', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value.toFixed(2)} TPM`, 'Expression']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem'
              }}
            />
            <Bar
              dataKey="expression"
              fill="#ef4444"
              opacity={0.8}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function formatTumorType(type: string): string {
  return type
    .replace('TCGA-', '')
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}