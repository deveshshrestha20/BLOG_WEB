# E-Bazar Nepal Blog

A modern, responsive blog platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to create, read, update, and delete blog posts with a beautiful and intuitive user interface.

## Features

- **User Authentication**: Secure login and registration system
- **Blog Management**: Create, read, update, and delete blog posts
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Modern UI**: Clean and intuitive user interface with smooth transitions
- **Image Support**: Upload and display images for blog posts
- **Author Attribution**: Posts display author information
- **Category System**: Organize posts by categories
- **Featured Posts**: Highlight important content on the homepage

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom authentication system
- **State Management**: React Context API
- **Image Handling**: Next.js Image component
- **Routing**: Next.js App Router

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-bazar-nepal-blog.git
   cd e-bazar-nepal-blog
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
blog/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── blogs/       # Blog-related pages
│   │   ├── login/       # Authentication pages
│   │   └── page.tsx     # Homepage
│   ├── components/      # Reusable UI components
│   ├── context/         # React Context providers
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
└── package.json         # Project dependencies
```

## Usage

### Creating a Blog Post

1. Log in to your account
2. Click on "Write Article" in the navigation bar
3. Fill in the title, description, content, and category
4. Upload an image for your post
5. Click "Publish" to create your blog post

### Editing a Blog Post

1. Navigate to your blog post
2. Click the "Edit" button
3. Make your changes
4. Click "Update" to save your changes

### Deleting a Blog Post

1. Navigate to your blog post
2. Click the "Delete" button
3. Confirm the deletion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
