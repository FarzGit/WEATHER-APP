# Weather World

Weather World is a web application that allows users to fetch current city weather, view 7-day weather forecasts, see past 7 days weather details, and save favorite city weather details. It includes user authentication (login and register) using JWT.

## Features

- Fetch and display the current city weather that you have searched.
- View 7 days weather forecast for the searched city.
- Display past 7 days weather details.
- Save favorite city weather details.
- User authentication with login and register using JWT.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Token)
- **Weather Data**: OpenWeather API

## Screenshots

![Screenshot1](https://github.com/FarzGit/WEATHER-APP/blob/master/Frontend/public/Screenshot%202024-07-08%20112817.png)
![Screenshot2](https://github.com/FarzGit/WEATHER-APP/blob/master/Frontend/public/Screenshot%202024-07-08%20121621.png)
![Screenshot2](https://github.com/FarzGit/WEATHER-APP/blob/master/Frontend/public/Screenshot%202024-07-08%20121537.png)


## Installation and Setup Instructions

To get a local copy up and running follow these simple steps:

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database.

### Installation

1. Clone the repository

   ```bash
   https://github.com/FarzGit/WEATHER-APP.git


2. Move to Frontend directory

   ```bash
   cd Frontend
   
3. Install dependency
    
   ```bash
   npm install
   
4. Run the app
    
   ```bash
   npm run dev

5. Take a another terminal tab and move on backend directory
    
   ```bash
   cd Backend

6. Install the dependency
    
   ```bash
   npm install

7. Run the server
    
   ```bash
   npm start

  ### Note

  When you clone and run the server it will not not work , on the backend root directory you need to create a .env file, In that file you give your , psql URL , JWT secret code , and openWheather Api

  ### Dot env

  - DATABASE_URL="Enter you url path here"
  - JWT_SECRET = enter a scret key here
  - OPENWEATHER_API_KEY = enter you openWeather Api key here
