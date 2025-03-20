import React from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className }: CardProps) {
  return (
    <div className={clsx('bg-white dark:bg-gray-800 shadow rounded-lg p-6', className)}>
      {title && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">{title}</h3>}
      {children}
    </div>
  );
}

export function CardStat({ title, value, trend, trendValue }: { title: string; value: string | number; trend?: 'up' | 'down'; trendValue?: string | number }) {
  return (
    <div className="flex flex-col">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
      <div className="flex items-baseline mt-1">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
        {trend && trendValue && (
          <p className={clsx('ml-2 text-sm', trend === 'up' ? 'text-red-600' : 'text-green-600')}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </p>
        )}
      </div>
    </div>
  );
} 