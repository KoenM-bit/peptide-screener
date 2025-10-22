import { memo } from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = memo(function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 rounded';

  const variantClasses = {
    text: 'h-4',
    rectangular: 'h-32',
    circular: 'rounded-full w-10 h-10',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse', // Simplified - could add custom wave animation
    none: '',
  };

  const style = {
    width: width
      ? typeof width === 'number'
        ? `${width}px`
        : width
      : undefined,
    height: height
      ? typeof height === 'number'
        ? `${height}px`
        : height
      : undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
});

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Table header skeleton */}
      <div className="flex space-x-4 p-4 border-b">
        <Skeleton width="20%" height={16} />
        <Skeleton width="15%" height={16} />
        <Skeleton width="25%" height={16} />
        <Skeleton width="20%" height={16} />
        <Skeleton width="20%" height={16} />
      </div>

      {/* Table rows skeleton */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex space-x-4 p-4 border-b border-gray-100"
        >
          <Skeleton width="20%" height={14} />
          <Skeleton width="15%" height={14} />
          <Skeleton width="25%" height={14} />
          <Skeleton width="20%" height={14} />
          <Skeleton width="20%" height={14} />
        </div>
      ))}
    </div>
  );
}

export function FilterPanelSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton width="30%" height={20} />
        <Skeleton width="15%" height={16} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Skeleton width="40%" height={14} />
          <Skeleton height={32} />
        </div>
        <div className="space-y-2">
          <Skeleton width="50%" height={14} />
          <Skeleton height={32} />
        </div>
        <div className="space-y-2">
          <Skeleton width="45%" height={14} />
          <Skeleton height={32} />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <Skeleton width="40%" height={20} />
        <Skeleton variant="rectangular" height={300} />
        <div className="flex justify-center space-x-4">
          <Skeleton width="15%" height={12} />
          <Skeleton width="20%" height={12} />
          <Skeleton width="18%" height={12} />
        </div>
      </div>
    </div>
  );
}
