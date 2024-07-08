import express from 'express'
const userRouter = express.Router()

import { registerUser,loginUser,currentWeather,pastWeather,forcastWeather, postFavorites, getFavorite } from '../controllers/userController.js'


userRouter.post('/register',registerUser) // This is the endpoint the used to register the a new user into database
userRouter.post('/login',loginUser) // This is the endpoint route for user can login into the application
userRouter.get('/weather/current',currentWeather) // This is the endpoint to used to fetch or get the current weather data
userRouter.get('/weather/forcast',forcastWeather) // This is the endpoint to used to fetch or get the forcast weather data
userRouter.get('/weather/past',pastWeather)// This is the endpoint to used to fetch or get the past weather data
userRouter.post('/favorites',postFavorites) // This is the endpoint to used to add a favorite city data into database
userRouter.get('/favorites',getFavorite) // This is the endpoint that is used to the get the favorite data into the user dashboard








export default userRouter