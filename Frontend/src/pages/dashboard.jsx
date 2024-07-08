import { useEffect, useState } from "react"
import axios from 'axios'
import Loading from "../components/loading"
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { toast } from 'react-toastify';


const Dashboard = () => {

    const [city, setCity] = useState('america')
    const [currentTemp, setCurrentTemp] = useState(null)
    const [debouncedCity, setDebouncedCity] = useState(city);
    const [forecastData, setForecastData] = useState(null);
    const [pastWeatherData, setPastWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCurrentTemp, setLoadingCurrentTemp] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedCity(city);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [city]);

    useEffect(() => {
        fetchData(debouncedCity);
    }, [debouncedCity])

    const fetchData = async (city) => { // This function used fetch the the all data from the weather like current , forcast for feature weather and past weather all the api are calling from this single functions
        try {
            setLoadingCurrentTemp(true);
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1df7be517b7b885b86f93f7a3430fbf7`);
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];

                const backendResponse = await axios.get(`http://localhost:3000/api/users/weather/current?lat=${lat}&lon=${lon}`)
                const currentTemperature = backendResponse.data;
                setCurrentTemp(currentTemperature)

                const backendResponseForcast = await axios.get(`http://localhost:3000/api/users/weather/forcast?lat=${lat}&lon=${lon}`)
                setForecastData(backendResponseForcast.data.list);

                const pastResponse = await axios.get(`http://localhost:3000/api/users/weather/past?lat=${lat}&lon=${lon}`);
                setPastWeatherData(pastResponse.data);
                setLoading(false);
                setLoadingCurrentTemp(false);
            } else {
                setLoading(false);
                setLoadingCurrentTemp(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            setLoadingCurrentTemp(false);
        }
    };


    const handleSearch = (e) => {// This is for handling search input field 
        e.preventDefault();
        fetchData(city);
    };


    const handleFavorites = async () => { // This function using handling the favorite icon & passing data to backend
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.post('http://localhost:3000/api/users/favorites', { city, userId })
            if (response) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error)

        }

    }


    return (
        <>
            <div className="bg-[url('/clouds.jpg')] bg-cover bg-no-repeat bg-center min-h-screen ">
                <div className="h-[70px]">
                    <div className="flex justify-between items-center h-[70px] px-4">
                        <p className="text-white font-bold text-2xl"> WHEATHER WORLD</p>
                        <div className="bg-slate-500 w-[50%] rounded-full p-2 bg-opacity-65 flex justify-center gap-4">
                            <p className="text-white font-bold cursor-pointer">Home</p>
                            <Link to='/favorites' className="text-white font-bold cursor-pointer">Favorites</Link>
                        </div>
                        <form className="flex gap-1" onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={city.toUpperCase()}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city name"
                                className="p-1 rounded-lg bg-[#4b4a4a] bg-opacity-60 text-white focus:outline-none"
                            />
                            <button className=" bg-[#4b4a4a] p-1 rounded-lg bg-opacity-60" type="submit"><IoSearch color="white" />
                            </button>
                        </form>
                    </div>
                </div>


                <div className="flex flex-col px-6">
                    <div className="bg-[#424242] h-[200px] bg-opacity-30 rounded-xl flex justify-between p-2">
                        <div className=" w-[33%] flex justify-center items-center">
                            <div className="flex  justify-between gap-5 py-2 px-3 items-center bg-[#37ce19] h-[100px] rounded-xl w-[50%]">
                                <div>
                                    <WiHumidity color="white" size={100} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-xl">Humidity:</p>
                                    <p className="text-white font-semibold text-[16px]">{currentTemp ? `${currentTemp.main.humidity} gm/m²` : '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[33%] flex justify-center">
                            <div className=" flex flex-col items-center justify-center">
                                <p className="text-white font-bold text-xl px-6">{city.toUpperCase()}</p>
                                <div className="pl-6 pt-7 flex justify-center items-center ">
                                    <img src="/sun.png" className="h-[100px]" alt="sun" />
                                    <p className="text-white font-bold text-[40px]">{currentTemp ? `${currentTemp.main.temp.toFixed(1)} °C` : '-'}</p>
                                </div>
                                <div className="pl-[50px]">
                                    <p className="text-white font-semibold text-xl px-6">{currentTemp ? `${currentTemp.weather[0].description}` : '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[33%] flex justify-center items-center relative">
                            <div className="flex  justify-between gap-5 py-2 px-3 items-center bg-[#304df0] h-[100px] rounded-xl w-[50%]">
                                <div>
                                    <FiWind color="white" size={70} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg">Wind Speed:</p>
                                    <p className="text-white font-semibold text-lg">{currentTemp ? `${(currentTemp.wind.speed * 3.6).toFixed(1)} km/h` : '-'}</p>
                                </div>
                            </div>
                            <MdFavoriteBorder onClick={handleFavorites} size={30} className=" cursor-pointer text-white absolute bottom-2 right-2" />
                        </div>
                    </div>


                    <div className="pt-2">
                        <p className="text-[#525252] font-extrabold">Next 7 day forcasting</p>
                    </div>
                    <div className="py-2 flex gap-3">
                        {loading ? (
                            <div className="flex flex-row gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                            </div>
                        ) : (
                            forecastData && forecastData.map((day, index) => (
                                <div key={index} className="w-[15%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                                    <div className="flex justify-center">
                                        <p className="text-white font-semibold">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col items-center ">
                                        <img src="/sun-smile.png" className="h-[80px]" alt="sun" />
                                        <p className="text-white font-bold pt-4">{day.main.temp} °C</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <div className="pt-2">
                        <p className="text-[#525252] font-extrabold">Last 7 day forcasting</p>
                    </div>
                    <div className="py-2 flex gap-3">
                        {loading ? (
                            <div className="flex flex-row gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                            </div>
                        ) : (
                            pastWeatherData && pastWeatherData.map((weather, index) => (
                                <div key={index} className="w-[15%] flex flex-col px-1 bg-[#424242] bg-opacity-30 rounded-lg">
                                    <div className="flex justify-center">
                                        <p className="text-white font-semibold">{weather.data[0].dt ? new Date(weather.data[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col items-center ">
                                        <img src="/public/sun-smile.png" className="h-[80px]" alt="sun" />
                                        <p className="text-white font-bold pt-4">{loadingCurrentTemp ? <Loading /> : (weather.data[0].temp ? `${weather.data[0].temp.toFixed(1)} °C` : '-')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard