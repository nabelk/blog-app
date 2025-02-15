# Blog Application

## Overview

This project is part of The Odin Project Node section. This documentation outlines the fundamental structures of a blog application that utilizes Express for the API and Next.js for both the Admin CMS and the Client View. The application features a RESTful API with protected routes using JSON Web Tokens (JWT) for authentication and public API endpoints for general access.

## Tech Stack

#### Backend:

- Express
- Bcryptjs
- Json Web Token
- Passport

#### Database:

- Prisma (Postgresql)

#### Frontend:

- Next.js
- Typescript
- Axios
- React-markdown
- Tailwind CSS

## API Endpoints

#### Client

- `GET /api/post/all` - Retrieve all blog posts
- `GET /api/post/:id` - Retrieve a specific blog post by ID
- `POST /api/comment/create/:postId` - Create a new comment in a specific blog post
- `GET /api/tag/all` - Retrieve all tags
- `GET /api/post/tag/:tagId` - Retrieve all blog posts associated with a specific tag

#### Admin (CMS)

- `GET /admin/posts/all` - Retrieve all posts
- `POST /admin/login` - Authenticate admin and log in
- `POST /admin/create-post` - Create a new post
- `PATCH /admin/posts/updatestatus/:id` - Update the status of a post by ID
- `PUT /admin/posts/update/:id` - Update a post by ID
- `DELETE /admin/posts/:id` - Delete a post by ID

## Deployment

- Hosted on Railway (db, server, web)

## Contact

Created by [@nabelk](https://www.linkedin.com/in/nabil-khalid-36791a241/) - feel free to contact me!
