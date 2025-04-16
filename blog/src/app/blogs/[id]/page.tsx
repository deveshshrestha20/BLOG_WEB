'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { getBlogs, deleteBlog } from '@/utils/storage';
import { use } from 'react';
import { Blog } from '@/types';
import BlogPostSkeleton from '@/components/BlogPostSkeleton';

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const blogs = getBlogs();
    const foundBlog = blogs.find(b => b.id === blogId);
    
    if (foundBlog) {
      setBlog(foundBlog);
    } else {
      setError('Blog post not found');
    }
    setLoading(false);
  }, [blogId]);

  const handleDelete = () => {
    deleteBlog(blogId);
    router.push('/blogs');
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/5 to-white flex items-center justify-center p-4">
        <div className="text-red-600 bg-red-50 p-4 rounded-md border border-red-200">
          {error || 'Blog post not found'}
        </div>
      </div>
    );
  }

  const isAuthor = user?.id === blog.authorId;
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/5 to-white py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-48 sm:h-64 md:h-96 w-full">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 1200px"
            />
          </div>
          
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs sm:text-sm font-semibold text-black bg-black/10 rounded-full">
                  {blog.category}
                </span>
                <div className="mt-2 flex items-center space-x-2">
                  <p className="text-xs sm:text-sm text-black/60">
                    {formattedDate}
                  </p>
                  <span className="text-black/40">•</span>
                  <p className="text-xs sm:text-sm text-black/60">
                    By {blog.authorName || 'Anonymous'}
                  </p>
                </div>
              </div>
              
              {isAuthor && (
                <div className="flex space-x-4">
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/blogs/${blogId}/edit`)}
                  >
                    Edit
                  </Button>
                  <button
                    onClick={handleDelete}
                    className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">{blog.title}</h1>
            
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-black/80">
              <p className="text-lg sm:text-xl mb-6 sm:mb-8">{blog.description}</p>
              
              <div className="whitespace-pre-wrap text-sm sm:text-base">{blog.content}</div>
            </div>
            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-black/10">
              <Button
                variant="secondary"
                onClick={() => router.push('/blogs')}
              >
                Back to Blogs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 