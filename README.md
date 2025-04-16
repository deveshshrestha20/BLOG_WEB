# Blog App

A simple blog application built with **Next.js 13** and **Tailwind CSS**. This project implements user authentication (signup and login) and blog management (create, edit, delete) using **localStorage** for data persistence on the client side.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Folder Structure](#folder-structure)
5. [Installation & Setup](#installation--setup)


---

## Overview

This **Blog App** allows users to:

- **Sign up** for an account and securely store their credentials in the browser’s localStorage.
- **Log in** with valid credentials to access the main blogs page.
- **Add new blogs** with a title, description, and an optional image (using a simulated image upload by storing a file path).
- **Edit** or **delete** existing blog posts.
- **Log out** to clear the session (removing the `isLoggedIn` flag from localStorage).

The application leverages Next.js 13's **App Router** and is styled with Tailwind CSS for a modern, responsive design.

---

## Tech Stack

- **Next.js 13:** React framework for server-side rendering and static site generation.
- **React 18:** Bundled with Next.js for building interactive UIs.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **localStorage:** Utilized for client-side data persistence (user credentials and blog entries).

---

## Features

1. **Signup & Login**  
   - Signup page collects name, email, and password, then saves this data to localStorage.
   - Login page validates credentials against stored user data.  
     - On success, sets `"isLoggedIn": true` and redirects to `/blogs`.
     - On failure, displays an error message.

2. **Blog Management**  
   - **Create:** Add new blog posts (title, description, image path).
   - **Edit/Delete:** Modify or remove existing blog entries.
   - **Display:** Blogs are shown on the `/blogs` page with the most recent posts first.
   - **Dummy Data:** Seeds 5 dummy blogs into localStorage on the first visit if none exist.

3. **Protected Routes**  
   - The `/blogs` page is accessible only when the user is authenticated.
   - Unauthorized access automatically redirects to the login page.

4. **Logout**  
   - Clears the `isLoggedIn` flag from localStorage and redirects the user to `/login`.

---

## Folder Structure

Below is the folder structure as depicted in the screenshots:

```bash
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
    ├── app                  # Next.js App Router folders & pages
    │   ├── blogs
    │   │   ├── [id]
    │   │   │   └── edit
    │   │   │       └── page.tsx    # Edit a specific blog post
    │   │   └── page.tsx            # Main blogs page
    │   ├── favicon.ico
    │   ├── globals.css             # Global styles including Tailwind CSS
    │   ├── layout.tsx              # Root layout for all app pages
    │   └── page.tsx                # Home page (could be a landing or redirection page)
    ├── components                 # Reusable React components
    │   ├── BlogImages.tsx
    │   ├── BlogsSkeleton.tsx
    │   ├── Button.tsx
    │   ├── HomeSkeleton.tsx
    │   └── Navbar.tsx
    ├── context                    # React Context for authentication state
    │   └── AuthContext.tsx
    ├── store                      # localStorage utilities and data management
    │   └── storage.ts
    └── types                      # TypeScript type definitions



```bash
# Installation & Setup
# Prerequisites
Node.js              # version 14 or higher
npm/Yarn             # package managers

# Steps
git clone 
cd blog
npm install          # or yarn install
npm run dev          # or yarn dev

# Access the application at http://localhost:3000
```

```bash
# Usage
1. Sign Up           # Create a new account on the signup page
2. Log In            # Enter your credentials to access the blog dashboard
3. Create a Blog     # Click on "Create New Blog" to add content
4. Manage Blogs      # Edit or delete your blogs from the dashboard
5. Log Out           # End your session when finished
```

```bash
