import express from 'express'
const userRouter = express.Router()

import { registerUser,loginUser,currentWeather,pastWeather,forcastWeather, postFavorites, getFavorite } from '../controllers/userController.js'


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/weather/current',currentWeather)
userRouter.get('/weather/forcast',forcastWeather)
userRouter.get('/weather/past',pastWeather)
userRouter.post('/favorites',postFavorites)
userRouter.get('/favorites',getFavorite)








export default userRouter