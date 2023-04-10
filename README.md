# Back-end Blogs API

This is a RESTful API for a blog system that allows users to create and manage blog posts. The API was built using Node.js and MongoDB.

## Features

- Users can create, read, update and delete blog posts.
- Posts can be filtered by title, content or author.
- Users can authenticate using JWT (JSON Web Tokens) and create an account.
- Users can view and update their own profile information.

## API Endpoints

- POST	/users/register	Creates a new user account.
- POST	/users/login	Authenticates a user and returns a JWT token.
- GET	/users/me	Returns information about the authenticated user.
- PUT	/users/me	Updates information about the authenticated user.
- GET	/posts	Returns a list of all blog posts.
- GET	/posts/:postId	Returns a specific blog post.
- POST	/posts	Creates a new blog post.
- PUT	/posts/:postId	Updates an existing blog post.
- DELETE	/posts/:postId	Deletes an existing blog post.
- GET	/posts/search?query=	Searches for blog posts with a given query.

## Technologies

- Node.js
- Express
- JWT (JSON Web Tokens)
