# Blog Application using MERN Stack

This project is a full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a platform for users to create, read, update, and delete blog posts.

## Features

- User authentication (Register, Login, Logout)
- Create, read, update, and delete blog posts
- View all posts or filter by user
- Responsive design for mobile and desktop
- Rich text editing for blog post content

## Technologies Used

- **Frontend:**
  - React.js
  - React Router for navigation
  - Axios for API requests
  - React Quill for rich text editing
  - TailwindCSS for styling

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database
  - Mongoose as ODM (Object Document Mapper)
  - JSON Web Tokens (JWT) for authentication
  - Bcrypt for password hashing
  - Firebase for file uploading

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Girwar-Sahu/blogapp-using-mern.git
   cd blogapp-using-mern
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm install (backend)
   cd client && npm install (frontend)
   ```

3. Set up environment variables:
   - Create a `.env` file in the `api` directory
   - Add the following variables:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

## Usage

1. Start the backend server:
   ```
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd client
   npm run dev
   ```

3. Open your browser and visit `http://localhost:3000` to use the application.

## Project Structure

- `/api`: Backend Node.js/Express application
  - `/models`: MongoDB models (Post.js, User.js)
  - `/routes`: Express routes for auth, posts, and users
  - `index.js`: Main server file
- `/client`: Frontend React application
  - `/src`: Source files
    - `/components`: React components
    - `/pages`: Main pages of the application
    - `/context`: React context for state management
    - `App.js`: Main application component
    - `index.js`: Entry point of React app

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `GET /api/posts`: Get all posts
- `POST /api/posts`: Create a new post
- `PUT /api/posts/:id`: Update a post
- `DELETE /api/posts/:id`: Delete a post
- `GET /api/users/:id`: Get user information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Girwar Sahu - [GitHub Profile](https://github.com/Girwar-Sahu)

Project Link: [https://github.com/Girwar-Sahu/blogapp-using-mern](https://github.com/Girwar-Sahu/blogapp-using-mern)
