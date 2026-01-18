/**
 * Sparkline chart component for price trends
 */

'use client';

import { memo, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  isPositive?: boolean;
}

export const Sparkline = memo(function Sparkline({
  data,
  width = 100,
  height = 30,
  className,
  isPositive = true,
}: SparklineProps) {
  const chartData = useMemo(() => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    return data.map((value, index) => ({
      value: ((value - min) / range) * 100,
      index,
    }));
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div
        className={className}
        style={{ width, height }}
        aria-label="No chart data"
      />
    );
  }

  const strokeColor = isPositive ? '#34d399' : '#f87171';

  return (
    <div className={className} style={{ width: '100%', maxWidth: width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
