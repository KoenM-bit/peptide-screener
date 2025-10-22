import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
  Legend
} from 'recharts';
import { Activity, AlertCircle } from 'lucide-react';
import { ProcessedCancerData } from '../../types/CancerTypes';
import { CancerTooltip } from './CancerTooltip';
import { useCancerData } from '../../hooks/useCancerData';

interface CancerExpressionChartProps {
  data: Record<string, any>;
}

export function CancerExpressionChart({ data }: CancerExpressionChartProps) {
  const { processedData, maxValue } = useCancerData(data);

  if (!processedData.length) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-rose-500" />
          <h3 className="text-lg font-semibold">Cancer Expression Profile</h3>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-500 py-8">
          <AlertCircle className="w-5 h-5" />
          <span>No cancer expression data available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-rose-500" />
        <h3 className="text-lg font-semibold">Cancer Expression Profile</h3>
      </div>
      
      <div className="h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 80, bottom: 120 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fill: '#4b5563', fontSize: 11 }}
            />
            <YAxis
              label={{
                value: 'Expression Level (Median nTPM)',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#4b5563' },
                offset: 10
              }}
              domain={[0, maxValue]}
              tick={{ fill: '#4b5563' }}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Tooltip content={<CancerTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={50}
              wrapperStyle={{
                paddingTop: '20px',
                bottom: '60px'
              }}
            />
            <Bar
              dataKey="tcgaMedian"
              name="TCGA"
              fill="rgba(59, 130, 246, 0.6)"
              radius={[4, 4, 0, 0]}
            >
              <ErrorBar
                dataKey="tcgaStdDev"
                width={4}
                strokeWidth={2}
                stroke="rgba(75, 85, 99, 0.6)"
              />
            </Bar>
            <Bar
              dataKey="validationMedian"
              name="Validation"
              fill="rgba(234, 88, 12, 0.6)"
              radius={[4, 4, 0, 0]}
            >
              <ErrorBar
                dataKey="validationStdDev"
                width={4}
                strokeWidth={2}
                stroke="rgba(75, 85, 99, 0.6)"
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}