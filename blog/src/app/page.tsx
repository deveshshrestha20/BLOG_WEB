'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadDummyBlogs, getBlogs } from '@/utils/storage';
import type { Blog } from '@/types';
import BlogImage from '@/components/BlogImage';
import HomeSkeleton from '@/components/HomeSkeleton';

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDummyBlogs();
    setBlogs(getBlogs());
    setLoading(false);
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  const featuredBlog = blogs[0];
  const secondaryFeatured = blogs[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-serif mb-4 text-[#121926]">
          Welcome to Blog
        </h1>
        <p className="text-lg text-[#121926]/70">
          Discover inspiring articles and the latest trends.
        </p>
      </div>

      <div className="space-y-16">
        {/* Featured Posts */}
        <section>
          <h2 className="text-2xl font-bold text-[#121926] mb-8">Featured</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {featuredBlog && (
              <article className="group relative overflow-hidden rounded-xl shadow-lg">
                <Link href={`/blogs/${featuredBlog.id}`}>
                  <div className="relative">
                    <BlogImage
                      src={featuredBlog.image}
                      alt={featuredBlog.title}
                      width={800}
                      height={500}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50"></div>
                  </div>
                  <div className="absolute bottom-0 p-6 text-white">
                    <p className="text-sm uppercase mb-2">
                      {featuredBlog.category}
                    </p>
                    <h3 className="text-3xl font-bold mb-1">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-sm">
                      {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              </article>
            )}
            {secondaryFeatured && (
              <article className="group relative overflow-hidden rounded-xl shadow-lg">
                <Link href={`/blogs/${secondaryFeatured.id}`}>
                  <div className="relative">
                    <BlogImage
                      src={secondaryFeatured.image}
                      alt={secondaryFeatured.title}
                      width={800}
                      height={500}
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50"></div>
                  </div>
                  <div className="absolute bottom-0 p-6 text-white">
                    <p className="text-sm uppercase mb-2">
                      {secondaryFeatured.category}
                    </p>
                    <h3 className="text-3xl font-bold mb-1">
                      {secondaryFeatured.title}
                    </h3>
                    <p className="text-sm">
                      {new Date(secondaryFeatured.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              </article>
            )}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-[#121926] mb-8">Recent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(2).map((blog) => (
              <article key={blog.id} className="group rounded-xl overflow-hidden shadow-lg">
                <Link href={`/blogs/${blog.id}`}>
                  <div>
                    <div className="relative h-64">
                      <BlogImage
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 bg-white">
                      <div className="flex items-center text-xs text-[#121926]/60 mb-2">
                        <span className="uppercase">{blog.category}</span>
                        <span className="mx-2">·</span>
                        <time>
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                      <h3 className="text-xl font-bold text-[#121926] mb-2 group-hover:text-[#121926]/80 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-[#121926]/70 text-base line-clamp-3">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Subscription Section */}
        <section className="bg-[#0B3619]/5 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-serif text-[#121926] mb-4">
              Get the best sent to your inbox, every month
            </h2>
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border text-[#121926] border-[#121926]/20 focus:outline-none focus:ring-2 focus:ring-[#121926]"
              />
              <button
                type="submit"
                className="bg-[#0B3619] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#121926]/80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
