/**
 * Sparkline chart component for price trends
 * Supports real-time animation with data flowing from right to left
 * Professional trading chart with time and price axes
 */

'use client';

import { memo, useMemo, useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  isPositive?: boolean;
  animate?: boolean;
  animationInterval?: number;
  showAxes?: boolean; // Show X and Y axes for detailed view
  basePrice?: number; // Base price for reference
}

// Format price for Y-axis
const formatPrice = (value: number) => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(4)}`;
};

// Format time for X-axis
const formatTime = (minutes: number) => {
  const now = new Date();
  const time = new Date(now.getTime() - (24 - minutes) * 60 * 1000);
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const Sparkline = memo(function Sparkline({
  data,
  width = 100,
  height = 30,
  className,
  isPositive = true,
  animate = false,
  animationInterval = 1000,
  showAxes = false,
  basePrice,
}: SparklineProps) {
  const [liveData, setLiveData] = useState<number[]>(data);
  const lastValueRef = useRef(data[data.length - 1] || 0);
  const tickCountRef = useRef(0);

  // Real-time animation effect
  useEffect(() => {
    if (!animate || data.length === 0) {
      setLiveData(data);
      return;
    }

    setLiveData(data);
    lastValueRef.current = data[data.length - 1] || 0;
    tickCountRef.current = 0;

    const interval = setInterval(() => {
      tickCountRef.current += 1;
      setLiveData((prevData) => {
        const variation = (Math.random() - 0.5) * 0.02 * lastValueRef.current;
        const newValue = Math.max(0.001, lastValueRef.current + variation);
        lastValueRef.current = newValue;
        return [...prevData.slice(1), newValue];
      });
    }, animationInterval);

    return () => clearInterval(interval);
  }, [animate, animationInterval, data]);

  const chartData = useMemo(() => {
    if (liveData.length === 0) return [];
    
    return liveData.map((value, index) => ({
      price: value,
      time: index,
      timeLabel: formatTime(index * (24 / liveData.length)),
    }));
  }, [liveData]);

  const { minPrice, maxPrice, currentPrice } = useMemo(() => {
    if (liveData.length === 0) return { minPrice: 0, maxPrice: 0, currentPrice: 0 };
    const min = Math.min(...liveData);
    const max = Math.max(...liveData);
    const padding = (max - min) * 0.1;
    return {
      minPrice: min - padding,
      maxPrice: max + padding,
      currentPrice: liveData[liveData.length - 1],
    };
  }, [liveData]);

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
  const gradientId = `gradient-${isPositive ? 'green' : 'red'}`;

  // Simple sparkline without axes
  if (!showAxes) {
    return (
      <div className={className} style={{ width: '100%', maxWidth: width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Detailed chart with axes for dialog
  return (
    <div className={className} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 45, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id={`${gradientId}-detail`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.2} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="time"
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
            tick={{ fill: '#64748b', fontSize: 9 }}
            tickFormatter={(value) => {
              const idx = Math.floor(value);
              if (idx % Math.ceil(chartData.length / 5) === 0) {
                return chartData[idx]?.timeLabel || '';
              }
              return '';
            }}
            interval={0}
          />
          
          <YAxis 
            domain={[minPrice, maxPrice]}
            axisLine={{ stroke: '#334155' }}
            tickLine={{ stroke: '#334155' }}
            tick={{ fill: '#64748b', fontSize: 9 }}
            tickFormatter={formatPrice}
            orientation="right"
            width={40}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              fontSize: '11px',
            }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: number) => [formatPrice(value), 'Price']}
            labelFormatter={(label) => chartData[label]?.timeLabel || ''}
          />
          
          {/* Current price reference line */}
          <ReferenceLine 
            y={currentPrice} 
            stroke={strokeColor}
            strokeDasharray="3 3"
            strokeOpacity={0.5}
          />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill={`url(#${gradientId}-detail)`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Current price badge */}
      <div 
        className="absolute right-0 px-1.5 py-0.5 text-[10px] font-medium rounded"
        style={{ 
          backgroundColor: strokeColor,
          color: '#fff',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        {formatPrice(currentPrice)}
      </div>
    </div>
  );
});
