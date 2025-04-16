'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Blog } from '@/types';
import { getBlogs, deleteBlog, loadDummyBlogs } from '@/utils/storage';
import BlogImage from '@/components/BlogImage';
import BlogSkeleton from '@/components/BlogSkeleton';

export default function BlogsPage() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    loadDummyBlogs();
    setBlogs(getBlogs());
    setLoading(false);
  }, [isLoggedIn, router]);

  const handleDelete = (blogId: string) => {
    deleteBlog(blogId);
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <h1 className="text-4xl font-serif text-[#121926] mb-12">All articles</h1>
        <BlogSkeleton featured={true} count={3} />
        <BlogSkeleton count={6} />
      </div>
    );
  }

  // Sort blogs to show user's posts first
  const sortedBlogs = [...blogs].sort((a, b) => {
    // If user is logged in, prioritize their posts
    if (user) {
      const aIsUserPost = a.authorId === user.id;
      const bIsUserPost = b.authorId === user.id;
      
      if (aIsUserPost && !bIsUserPost) return -1;
      if (!aIsUserPost && bIsUserPost) return 1;
    }
    
    // Then sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Get featured blogs (first three)
  const featuredBlogs = sortedBlogs.slice(0, 3);
  // Get remaining blogs for the grid
  const remainingBlogs = sortedBlogs.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <h1 className="text-4xl font-serif text-[#121926] mb-12">All articles</h1>

      {/* Featured Section */}
      {featuredBlogs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Large Featured Article */}
          <article className="lg:col-span-8 flex flex-col h-full group transition-all duration-300 hover:-translate-y-1">
            <Link href={`/blogs/${featuredBlogs[0].id}`} className="flex flex-col flex-grow">
              <div className="mb-4 flex-grow">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <BlogImage
                    src={featuredBlogs[0].image}
                    alt={featuredBlogs[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center text-sm mb-2">
                  <span className="uppercase text-[#121926]">{featuredBlogs[0].category}</span>
                  <span className="mx-2 text-[#121926]">·</span>
                  <time className="text-[#121926]">
                    {new Date(featuredBlogs[0].createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  {featuredBlogs[0].authorId === user?.id && (
                    <>
                      <span className="mx-2 text-[#121926]">·</span>
                      <span className="text-[#0B3619] font-medium">Your post</span>
                    </>
                  )}
                </div>
                <h2 className="text-3xl font-serif text-[#121926] mb-3 transition-colors duration-300 group-hover:text-[#121926]/80">
                  {featuredBlogs[0].title}
                </h2>
                <p className="text-[#435166] line-clamp-2 leading-relaxed text-lg">
                  {featuredBlogs[0].description}
                </p>
              </div>
            </Link>
            {user && user.id === featuredBlogs[0].authorId && (
              <div className="flex space-x-4 mt-4">
                <button
                  className="text-sm text-[#0B3619] hover:text-[#0B3619]/80"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/blogs/${featuredBlogs[0].id}/edit`);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-sm text-red-600 hover:text-red-900"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(featuredBlogs[0].id);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </article>

          {/* Right Side Stacked Articles */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            {featuredBlogs.slice(1, 3).map((blog) => (
              <article key={blog.id} className="group transition-all duration-300 hover:-translate-y-1">
                <Link href={`/blogs/${blog.id}`}>
                  <div className="mb-4">
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <BlogImage
                        src={blog.image}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm mb-2">
                      <span className="uppercase text-[#121926]">{blog.category}</span>
                      <span className="mx-2 text-[#121926]">·</span>
                      <time className="text-[#121926]">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      {blog.authorId === user?.id && (
                        <>
                          <span className="mx-2 text-[#121926]">·</span>
                          <span className="text-[#0B3619] font-medium">Your post</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-serif text-[#121926] mb-2 transition-colors duration-300 group-hover:text-[#121926]/80">
                      {blog.title}
                    </h2>
                    <p className="text-[#435166] line-clamp-2 leading-relaxed text-sm">
                      {blog.description}
                    </p>
                  </div>
                </Link>
                {user && user.id === blog.authorId && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="text-sm text-[#0B3619] hover:text-[#0B3619]/80"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/blogs/${blog.id}/edit`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-red-600 hover:text-red-900"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(blog.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Articles Grid */}
      {remainingBlogs.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {remainingBlogs.map((blog) => (
            <article key={blog.id} className="group transition-all duration-300 hover:-translate-y-1">
              <Link href={`/blogs/${blog.id}`}>
                <div className="mb-4">
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <BlogImage
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm mb-2">
                    <span className="uppercase text-[#121926]">{blog.category}</span>
                    <span className="mx-2 text-[#121926]">·</span>
                    <time className="text-[#121926]">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                    {blog.authorId === user?.id && (
                      <>
                        <span className="mx-2 text-[#121926]">·</span>
                        <span className="text-[#0B3619] font-medium">Your post</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-serif text-[#121926] mb-2 transition-colors duration-300 group-hover:text-[#121926]/80">
                    {blog.title}
                  </h2>
                  <p className="text-[#435166] line-clamp-2 leading-relaxed text-sm">
                    {blog.description}
                  </p>
                </div>
              </Link>
              {user && user.id === blog.authorId && (
                <div className="flex space-x-4 mt-4">
                  <button
                    className="text-sm text-[#0B3619] hover:text-[#0B3619]/80"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/blogs/${blog.id}/edit`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-sm text-red-600 hover:text-red-900"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(blog.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
