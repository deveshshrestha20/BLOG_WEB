# Next.js 13 Blog Application

```bash
# Quick Start
cd blog
npm install          # or yarn install
npm run dev          # or yarn dev

A**ccess at http://localhost:3000**

```

```bash
# Tech Stack
Next.js 13           # React framework for server-side rendering and static site generation
React 18             # Bundled with Next.js for building interactive UIs
Tailwind CSS         # A utility-first CSS framework for rapid UI development
localStorage         # Utilized for client-side data persistence (user credentials and blog entries)
```

```bash
# Features
# 1. Authentication
Signup & Login       # Collect and validate user credentials against localStorage data
                     # On success: sets "isLoggedIn": true and redirects to /blogs
                     # On failure: displays error message
Protected Routes     # /blogs page accessible only when authenticated
                     # Unauthorized access redirects to login page
Logout               # Clears isLoggedIn flag and redirects to /login

# 2. Blog Management
Create               # Add new blog posts (title, description, image path)
Edit/Delete          # Modify or remove existing blog entries
Display              # Blogs shown on /blogs page with most recent posts first
Dummy Data           # Seeds 5 dummy blogs into localStorage on first visit if none exist
```

```bash
# Folder Structure
blog
├── .gitignore
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md                  # Project documentation (this file)
├── tsconfig.json
├── public                     # Static assets (images, SVGs, etc.)
│   ├── default-blog-image.jpg
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── pages.svg
│   ├── window.svg
│   └── ...
└── src
    ├── app                    # Next.js App Router folders & pages
    │   ├── blogs
    │   │   ├── [id]
    │   │   │   └── edit
    │   │   │       └── page.tsx    # Edit a specific blog post
    │   │   └── page.tsx            # Main blogs page
    │   ├── favicon.ico
    │   ├── globals.css             # Global styles including Tailwind CSS
    │   ├── layout.tsx              # Root layout for all app pages
    │   └── page.tsx                # Home page (could be a landing or redirection page)
    ├── components                  # Reusable React components
    │   ├── BlogImages.tsx
    │   ├── BlogsSkeleton.tsx
    │   ├── Button.tsx
    │   ├── HomeSkeleton.tsx
    │   └── Navbar.tsx
    ├── context                     # React Context for authentication state
    │   └── AuthContext.tsx
    ├── store                       # localStorage utilities and data management
    │   └── storage.ts
    └── types                       # TypeScript type definitions
```


```bash
# Usage
1. Sign Up           # Create a new account on the signup page
2. Log In            # Enter your credentials to access the blog dashboard
3. Create a Blog     # Click on "Create New Blog" to add content
4. Manage Blogs      # Edit or delete your blogs from the dashboard
5. Log Out           # End your session when finished
```

