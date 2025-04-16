export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  content?: string;
  image: string;
  authorId: string;
  authorName?: string;
  category: string;
  createdAt: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
} 