# Take Home API

Welcome to the Take-Home-Api! This Nest.js application provides the backend functionality for the URL Shortener project, including user authentication, URL management, and usage tracking.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 20)
- npm (Node Package Manager)
- Docker (for running the application in a Docker container)

## Environment Variables

Create a `.env` file in the root directory of the project and provide the following environment variables:

```
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongo_db_url
PORT=8080
URL_PATH=http://localhost:8080
```

To use this project, follow these steps

1. Installation: 
   Clone this repository to your local machine 

   git clone https://github.com/abbasikov/Take-Home-Api.git

2. Navigate to the project directory:

   cd <project-directory>

3. Install project dependencies using npm:
   
   npm install

4. Start the App:

   npm run start:dev


Creating Docker Container

Assuming Docker is installed on your machine, you can build and run the Docker image for the backend using the following commands:

1. Build the Docker image:
   
   docker build -t take-home-api .

2. Run the docker container

   docker run -p 8080:8080 take-home-api

This will expose port 8080 on your local machine to access the backend server running inside the Docker container.

Enjoy!!

