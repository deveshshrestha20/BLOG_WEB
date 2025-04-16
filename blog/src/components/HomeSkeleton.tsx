import React from 'react';

export default function HomeSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 text-center">
        <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-6 w-1/2 mx-auto bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="space-y-16">
        {/* Featured Posts Skeleton */}
        <section>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Article Skeleton */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[500px] bg-gray-200 animate-pulse"></div>
              <div className="absolute bottom-0 p-6 w-full">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Secondary Featured Article Skeleton */}
            <div className="group relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative h-[500px] bg-gray-200 animate-pulse"></div>
              <div className="absolute bottom-0 p-6 w-full">
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-3/4 bg-gray-300 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Skeleton */}
        <section>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group rounded-xl overflow-hidden shadow-lg">
                <div className="relative h-64 bg-gray-200 animate-pulse"></div>
                <div className="p-6 bg-white">
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
        </section>
      </div>
    </div>
  );
} 