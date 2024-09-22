# To-Do List Web Application

This is a simple To-Do List web application built using Node.js, Express, MongoDB, and EJS. Users can create accounts, manage multiple to-do lists, and keep track of tasks.

## Features

- **User Authentication**: Sign up and login functionality with a username and password.
- **Multiple Lists**: Users can create and manage multiple to-do lists.
- **Add/Delete Tasks**: Add tasks to lists and delete them when completed.
- **Edit List Names**: Rename existing to-do lists.
- **Default List**: Every new user starts with a default "Getting Started" list with example tasks.
- **Persistent Data**: Data is stored in MongoDB, ensuring it is saved across sessions.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: EJS templates for rendering views, HTML/CSS for the UI
- **Other**: Lodash for utility functions, Body-Parser for handling form data

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app

2. Install the necessary dependencies
   ```bash
   npm install

3. Ensure MongoDB is running locally on your machine. You can start MongoDB with the following command:
   ```bash
   mongod

4. Start the application:
   ```bash
   npm start

## Directory Structure

- **app.js**: Main application file that initializes the server, connects to the database, and sets up routes.
- **routes/**: Defines all routes for the app, including user login, signup, creating lists, and managing tasks.
- **models/**: MongoDB schema for users and their associated to-do lists.
- **views/**: Contains EJS templates for rendering the front-end.

## Usage

1. Visit http://localhost:3000/ in your browser.
2. Sign up for a new account or log in with an existing one.
3. After logging in, create new lists, add tasks, or edit and delete existing ones.
4. Your tasks and lists are saved automatically in the MongoDB database.

## Future Enhancements

- **Password Encryption**: Currently, passwords are stored as plain text. A future update could integrate password hashing for better security.
- **Task Deadlines**: Add functionality to assign deadlines to tasks.
- **Task Priorities**: Implement priority levels (e.g., High, Medium, Low) for tasks.

## License

This project is open-source and available under the MIT License.