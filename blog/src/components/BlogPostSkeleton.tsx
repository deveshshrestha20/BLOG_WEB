import React from 'react';

export default function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black/5 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-96 w-full bg-gray-200 animate-pulse"></div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse mb-2"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
            
            <div className="space-y-4">
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-black/10">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 