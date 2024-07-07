import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios'


const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('the hashed password is :', hashedPassword)
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        console.log('the new user is :', newUser)
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password)

    try {

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}



const getWeatherData = async (city, endpoint) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = 'https://api.openweathermap.org/data/2.5';
    const url = `${baseUrl}/${endpoint}`;

    const response = await axios.get(url, {
        params: { q: city, appid: apiKey }
    });

    return response.data;
};






const currentWeather = async (req, res) => {

    try {
        const { city } = req.query;
        if (!city) return res.status(400).json({ message: 'City is required' });

        const currentWeather = await getWeatherData(city, 'weather');
        res.json(currentWeather);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching weather data', error });

    }
}




const forcast = async(req,res)=>{

    try {
        const { city } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });

    const forecastWeather = await getWeatherData(city, 'forecast/daily');
    res.json(forecastWeather);
        
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: 'Error fetching weather data', error });
        
    }
}






export {
    registerUser,
    loginUser,
    currentWeather,
    forcast
}