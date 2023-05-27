# React Blog API

This is a simple RESTful API built with Express.js and MySQL to support a blog application developed using React.

## Prerequisites

- Node.js and npm should be installed on your machine.
- MySQL server should be installed and running.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-blog-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-blog-api
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up the MySQL database:

   - Create a new database in your MySQL server.
   - Update the database connection details in `app.js` file:

     ```javascript
     const connection = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
       database: "your_database_name",
     });
     ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

- `GET /`: Get all users.
- `GET /posts`: Get all blog posts.
- `GET /comments`: Get all comments.
- `GET /posts/:id`: Get a specific blog post by ID.
- `GET /comments/:id`: Get comments for a specific blog post by ID.
- `POST /comments/:id`: Add a new comment to a blog post.
- `POST /posts`: Create a new blog post.
- `POST /users`: Register a new user.
- `POST /login`: Authenticate a user.
- `DELETE /posts/:id`: Delete a blog post.
- `DELETE /comments/:id`: Delete a comment.
- `PUT /posts/:id`: Update a blog post.
- `PUT /comments/:id`: Update a comment.

## Database Schema

The API assumes the following database schema:

- `users` table:
  - `id` (INT): User ID (Primary Key)
  - `username` (VARCHAR): User's username
  - `email` (VARCHAR): User's email
  - `password` (VARCHAR): User's password
  - `created_at` (TIMESTAMP): User creation timestamp

- `posts` table:
  - `id` (INT): Post ID (Primary Key)
  - `title` (VARCHAR): Post title
  - `content` (TEXT): Post content
  - `author_id` (INT): Author's User ID (Foreign Key referencing `users` table)
  - `created_at` (TIMESTAMP): Post creation timestamp

- `comments` table:
  - `id` (INT): Comment ID (Primary Key)
  - `content` (TEXT): Comment content
  - `post_id` (INT): Post ID (Foreign Key referencing `posts` table)
  - `author_id` (INT): Author's User ID (Foreign Key referencing `users` table)
  - `created_at` (TIMESTAMP): Comment creation timestamp

## License

This project is licensed under the [MIT License](LICENSE).
```
Feel free to customize the README file as per your project's specific details and requirements.
```
