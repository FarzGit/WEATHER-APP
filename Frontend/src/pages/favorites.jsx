import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const Favorites = () => {
    const [weatherData, setWeatherData] = useState([]);



    useEffect(() => {
        const fetchData = async () => { // This function is using for fetching the weather data from database
            try {
                const userId = localStorage.getItem('userId');
                console.log(userId, 'asdfasdfasdfasdfasdf');
                const response = await axios.get('http://localhost:3000/api/users/favorites', { params: { userId } });
                const favorites = response.data;
                const weatherPromises = favorites.map(async (favorite) => {
                    const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${favorite.city}&appid=1df7be517b7b885b86f93f7a3430fbf7`);
                    const { lat, lon } = geoResponse.data[0];
                    const weatherResponse = await axios.get(`http://localhost:3000/api/users/weather/current?lat=${lat}&lon=${lon}`);
                    return {
                        city: favorite.city,
                        weather: weatherResponse.data,
                    };
                });
                const weatherResults = await Promise.all(weatherPromises);
                setWeatherData(weatherResults);
            } catch (error) {
                console.log(error,'Something wentWrong fetching favorite data');
            }
        }
        fetchData();
    }, []);



    return (
        <div className="bg-[url('/clouds.jpg')] bg-cover bg-no-repeat bg-center min-h-screen ">
            <div className="h-[70px]">
                <div className="flex  gap-[168px] items-center h-[70px] px-4">
                    <p className="text-white font-bold text-2xl"> WHEATHER WORLD</p>
                    <div className="bg-slate-500 w-[50%] rounded-full p-2 bg-opacity-65 flex justify-center gap-4">
                        <Link to='/dashboard' className="text-white font-bold cursor-pointer">Home</Link>
                        <p className="text-white font-bold cursor-pointer">Favorites</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-4">
                <h1 className="text-white font-bold text-xl">
                    FAVORITE CITY WEATHER
                </h1>
            </div>
            <div className="py-2 px-6 flex flex-wrap gap-3">
                {weatherData.map((data,index)=>(
                <div key={index} className="w-[24%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                    <div className="flex justify-center">
                        <p className="text-white font-semibold">{new Date(data.weather.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <hr />
                    <div className="flex justify-center py-3">
                        <h3 className="text-white font-bold text-xl">{data.city.toUpperCase()}</h3>
                    </div>
                    <div className="flex px-4 justify-around">
                        <div className="flex flex-col items-center ">
                            <img src="/sun-smile.png" className="h-[80px]" alt="sun" />
                            <p className="text-white font-bold pt-4 text-xl">{data.weather.main.temp} °C</p>
                        </div>
                        <div className="flex flex-col  gap-3 w-[]">
                            <p className="bg-[#37ce19] p-1 rounded-lg text-white w-[100%]"><span className="font-bold">Humidity: </span>{data.weather.main.humidity} gm/m²</p>
                            <p className="bg-[#304df0] p-1 rounded-lg text-white"><span className="font-bold">Wind Speed:</span> {data.weather.wind.speed} km/h</p>
                        </div>
                    </div>
                    <div className="flex justify-center py-3">
                        <p className="text-white font-semibold">
                            <span className="font-extrabold">Condition:</span> {data.weather.weather[0].description}
                        </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Favorites