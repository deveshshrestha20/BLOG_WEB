'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { saveBlog } from '@/utils/storage';

const categories = [
  'Technology',
  'Travel',
  'Food',
  'Lifestyle',
  'Health',
  'Business',
  'Education',
  'Entertainment'
];

export default function NewBlogPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    image: null as File | null
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('You must be logged in to create a blog post');
      return;
    }

    if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.image) {
      setError('Please fill in all fields and upload an image');
      return;
    }

    try {
      // Convert the image file to a data URL
      const imageUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(formData.image!);
      });

      const newBlog = {
        id: Date.now().toString(),
        authorId: user.id,
        authorName: user.name,
        createdAt: new Date().toISOString(),
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        image: imageUrl
      };

      saveBlog(newBlog);
      router.push(`/blogs/${newBlog.id}`);
    } catch {
      setError('Failed to create blog post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/5 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-black mb-8">Create a New Blog Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black/20 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {previewImage ? (
                      <div className="relative h-64 w-full mb-4">
                        <Image
                          src={previewImage}
                          alt="Preview"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-black/40"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-black/60">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-black/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-black/40">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                  placeholder="Enter the title of your blog post"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-black">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                  placeholder="Enter a brief description of your blog post"
                />
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-black">
                  Content
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="mt-1 block w-full px-3 py-2 border border-black/20 rounded-md shadow-sm text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                  placeholder="Write your blog post content here"
                />
              </div>

              {error && (
                <div className="text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <Button
                  variant="secondary"
                  onClick={() => router.push('/blogs')}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 