import React from 'react';

interface BlogSkeletonProps {
  count?: number;
  featured?: boolean;
}

export default function BlogSkeleton({ count = 6, featured = false }: BlogSkeletonProps) {
  // Create an array of the specified count
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Large Featured Article Skeleton */}
        <div className="lg:col-span-8 flex flex-col h-full">
          <div className="mb-4 flex-grow">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Right Side Stacked Articles Skeleton */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-8">
          {skeletons.slice(0, 2).map((i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-4">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-200 animate-pulse rounded-lg"></div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {skeletons.map((i) => (
        <div key={i} className="group transition-all duration-300">
          <div className="mb-4">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-4/5 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
} 