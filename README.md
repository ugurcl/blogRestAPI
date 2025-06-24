
# Blog API

A fully functional blog REST API developed using Node.js and TypeScript, featuring JWT-based authentication and role-based access control.

---

## Table of Contents

- [Overview](#overview)  
- [Installation](#installation)  
- [Technologies Used](#technologies-used)  
- [API Routes](#api-routes)  
- [Environment Variables](#environment-variables)  
- [License](#license)

---

## Overview

This project allows users to register, login, create and manage blog posts, and comment on posts. Authentication is handled via JWT, with access control based on user roles (admin and regular users).

---

## Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/ugurcl/blogRestAPI
   cd blogRestAPI
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
CLIENT_URL=http://localhost:3000
JWT_SECRET=SECRETKEY
CONNECTION_STRING=mongodb://localhost:27017/blogRestAPI

JWT_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_DAYS=30

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<user@gmail>
SMTP_PASS=pass
```

4. Start the development server:  
   ```bash
   npm run dev
   ```

---

## Technologies Used

- Node.js  
- TypeScript  
- Express  
- Mongoose  
- JWT (jsonwebtoken)  
- bcryptjs  
- multer  
- morgan  
- nodemailer  
- zod  
- redis  
- slugify  

---

## API Routes

### Auth (Authentication)

| Endpoint             | Method | Description                  | Validation           |
|----------------------|--------|------------------------------|----------------------|
| `/auth/login`        | POST   | User login                   | `loginSchema` validation |
| `/auth/register`     | POST   | Register new user            | `registerSchema` validation |
| `/auth/refresh`      | POST   | Refresh JWT token            | —                    |
| `/auth/logout`       | POST   | Logout                      | —                    |
| `/auth/forgot-password` | POST | Send password reset email    | —                    |
| `/auth/reset-password` | POST  | Reset password               | —                    |

### Category

| Endpoint            | Method | Description                  | Authorization        |
|---------------------|--------|------------------------------|----------------------|
| `/category`         | POST   | Create new category           | Auth + Admin         |
| `/category`         | GET    | List all categories           | Auth + Admin         |
| `/category/:id`     | PUT    | Update category               | Auth + Admin         |
| `/category/:id`     | DELETE | Delete category               | Auth + Admin         |

### Comment

| Endpoint              | Method | Description                     | Authorization        |
|-----------------------|--------|---------------------------------|----------------------|
| `/comment`            | POST   | Add new comment                 | Auth                 |
| `/comment/:id`        | DELETE | Delete comment                  | Auth                 |
| `/comment/post/:postId`| GET   | Get comments by post            | Public                |

### Post

| Endpoint             | Method | Description                    | Authorization        |
|----------------------|--------|--------------------------------|----------------------|
| `/post`              | GET    | List all posts                  | Public               |
| `/post/:slug`        | GET    | Get post by slug                | Public               |
| `/post`              | POST   | Create new post (with header image upload) | Auth + Admin         |
| `/post/:id`          | PUT    | Update post (with header image upload) | Auth + Admin         |
| `/post/:id`          | DELETE | Delete post                    | Auth + Admin         |
| `/post/:id/like`     | POST   | Like a post                    | Auth                 |
| `/post/:id/dislike`  | POST   | Dislike a post                 | Auth                 |

### User

| Endpoint            | Method | Description                   | Authorization        |
|---------------------|--------|------------------------------|----------------------|
| `/user/me`          | GET    | Get own profile               | Auth                 |
| `/user/me`          | PUT    | Update profile (including avatar upload) | Auth          |
| `/user/all`         | GET    | List all users                | Auth + Admin         |
| `/user/:id`         | DELETE | Delete a user                | Auth + Admin         |
| `/user/:id/role`    | PATCH  | Update user role             | Auth + Admin         |

---

## Environment Variables

Your `.env` file should include the following variables:

```env
PORT=3000
CLIENT_URL=http://localhost:3000
JWT_SECRET=scretkey
CONNECTION_STRING=mongodb://localhost:27017/blogRestAPI

JWT_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_DAYS=30

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<user@gmail>
SMTP_PASS=<pass>
```

---

## License

This project is licensed under the MIT License.

---

Feel free to ask if you want me to add example requests/responses or Swagger documentation.
