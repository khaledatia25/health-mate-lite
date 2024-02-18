# HealthMate Lite

HealthMate Lite is a backend project built with Node.js, MongoDB, TypeScript, and GraphQL. It enables users to track their health-related activities, set goals, and monitor their progress.

## Technologies Used

- **Node.js:** A JavaScript runtime for building server-side applications.
- **MongoDB:** A NoSQL database for storing user information and activity data.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, providing better code maintainability and readability.
- **GraphQL:** A query language for APIs that allows clients to request only the data they need.
- **Express:** A web application framework for Node.js used to build the API endpoints.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a schema-based solution to model application data.

## Features

- **User Registration and Login:** Users can register and securely log in to the application. Registration includes input validation for required fields.

- **Daily Steps Tracking:** Users can track their daily steps to monitor their activity levels.

- **Fitness Goals:** Users can set fitness goals within the application to track their progress towards achieving them.

- **Calorie Tracking:** The application allows users to track their calorie intake to help manage their diet and nutrition.

## Installation

To run HealthMate Lite locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     ```
4. Start the server: `npm start`

