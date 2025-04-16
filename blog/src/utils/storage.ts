import { User, Blog } from '../types';

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

const STORAGE_KEY = 'blogs';

export const getBlogs = (): Blog[] => {
  if (typeof window === 'undefined') return [];
  const blogs = localStorage.getItem(STORAGE_KEY);
  return blogs ? JSON.parse(blogs) : [];
};

export const saveBlog = (blog: Blog): void => {
  const blogs = getBlogs();
  blogs.push(blog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
};

export const updateBlog = (updatedBlog: Blog): void => {
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === updatedBlog.id);
  if (index !== -1) {
    blogs[index] = updatedBlog;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  }
};

export const deleteBlog = (blogId: string): void => {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter((b) => b.id !== blogId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBlogs));
};

export const loadDummyBlogs = () => {
  if (getBlogs().length === 0) {
    const dummyBlogs: Blog[] = [
      {
        id: '1',
        title: 'AI: Transforming industries one byte at a time',
        description: 'A look at how artificial intelligence is revolutionising various industries through automation and data analysis.',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Technology',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Mindfulness in a fast-paced world',
        description: 'Discussing the importance and benefits of mindfulness practices in today\'s busy lifestyle.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Lifestyle',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Sustainable living: Small changes, big impact',
        description: 'Exploring simple yet effective ways to adopt a more environmentally conscious lifestyle.',
        image: 'https://images.unsplash.com/photo-1472141521881-95d0e87e2e39?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Lifestyle',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'The future of smart homes',
        description: 'A look at the potential benefits and privacy concerns associated with smart home technology.',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Technology',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Urban art movements shaping cities',
        description: 'How street art and urban installations are transforming metropolitan landscapes.',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Culture',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Tech innovators changing the world',
        description: 'Profiles of pioneering individuals who are driving technological advancements and innovation.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'People',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '7',
        title: 'Digital art in modern culture',
        description: 'Exploring how digital art is becoming a significant part of contemporary culture.',
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1200&h=800',
        category: 'Culture',
        authorId: 'user1',
        createdAt: new Date().toISOString(),
      }
    ];

    dummyBlogs.forEach(saveBlog);
  }
}; 