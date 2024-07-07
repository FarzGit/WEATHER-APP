import express from 'express'
const userRouter = express.Router()

import { registerUser,loginUser,currentWeather, forcast } from '../controllers/userController.js'


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/weather/current',currentWeather)
userRouter.get('/weather/forecast',forcast)






export default userRouter