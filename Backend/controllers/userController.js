import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios'


const JWT_SECRET = process.env.JWT_SECRET //This is the secret key for accessing JWT

const registerUser = async (req, res) => { // This function is used for new user registration
    const { email, name, password } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
}


const loginUser = async (req, res) => { // This function for user login , only for registered user
    const { email, password } = req.body;
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
        res.json({ userId: user.id, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}



const getWeatherData = async (lat, lon, endpoint) => { // This function is using for call the currennt weather data
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = 'https://api.openweathermap.org/data/2.5';
    const url = `${baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
        params: { lat: lat, lon: lon, appid: apiKey, units: 'metric' }
    });
    return response.data;
};



const getForcastWeatherData = async (lat, lon, endpoint) => {// This function is using for getting the feature weather data 
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = 'https://api.openweathermap.org/data/2.5';
    const url = `${baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
        params: { lat: lat, lon: lon, cnt: '7', appid: apiKey, units: 'metric' }
    });
    return response.data;
};


const getPastWeatherData = async (lat, lon, dt, endpoint) => {  // This function is using for get the past weather data
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const baseUrl = 'https://api.openweathermap.org/data/3.0';
    const url = `${baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
        params: { lat: lat, lon: lon, dt: dt, appid: apiKey }
    });
    return response.data;
};


const getPastDayTime = () => { // This function for using to get the past 7 days date
    const timestamps = [];
    const currentDate = new Date();
    for (let i = 1; i <= 7; i++) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i);
        timestamps.push(Math.floor(pastDate.getTime() / 1000));
    }
    return timestamps;
};

const pastWeather = async (req, res) => { // In this function written the logics for getting the past weather 
    try {
        const { lat, lon } = req.query;
        if (!lat && lon) return res.status(400).json({ message: 'City is required' });
        const timestamps = getPastDayTime();
        const pastWeatherData = [];
        for (const timestamp of timestamps) {
            const pastWeather = await getPastWeatherData(lat, lon, timestamp, 'onecall/timemachine');
            pastWeatherData.push(pastWeather);
        }
        res.json(pastWeatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error });
    }
}






const currentWeather = async (req, res) => { // In this function written the logics for getting the current weather 
    try {
        const { lat, lon } = req.query;
        if (!lat && lon) return res.status(400).json({ message: 'City is required' });
        const currentWeather = await getWeatherData(lat, lon, 'weather');
        res.json(currentWeather);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error });
    }
}

const forcastWeather = async (req, res) => { // In this function written the logics for getting the forecast weather 
    try {
        const { lat, lon } = req.query;
        if (!lat && lon) return res.status(400).json({ message: 'City is required' });
        const forcastWeather = await getForcastWeatherData(lat, lon, 'forecast');
        res.json(forcastWeather);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error });
    }
}




const postFavorites = async (req, res) => { // In this function written the logics for post the user favorite city weather
    try {
        const { city, userId } = req.body;
        if (!city) return res.status(400).json({ message: 'City is required' });
        const id = parseInt(userId)
        const favorite = await prisma.favorite.create({
            data: {
                city,
                userId: id
            }
        });
        if (favorite) {
            res.status(200).json({ message: 'Successfully added favorite city', favorite });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite city', error });
    }
}



const getFavorite = async (req, res) => { // In this function written the logics for getting the favorite city weather 
    try {
        const { userId } = req.query
        if (!userId) {
            return res.status(400).json({ error: 'Something went wrong please Re-login' });
        }
        const id = parseInt(userId)
        const favorites = await prisma.favorite.findMany({
            where: { userId: id }
        });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite city please relogin and try again', error });
    }
}


export {
    registerUser,
    loginUser,
    currentWeather,
    pastWeather,
    forcastWeather,
    postFavorites,
    getFavorite
}