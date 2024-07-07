import { useEffect, useState } from "react"
import axios from 'axios'
import Loading from "../components/loading"
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";



const Dashboard = () => {

    const [city, setCity] = useState('america')
    const [currentTemp, setCurrentTemp] = useState(null)
    const [debouncedCity, setDebouncedCity] = useState(city);
    const [forecastData, setForecastData] = useState(null);
    const [pastWeatherData, setPastWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingCurrentTemp, setLoadingCurrentTemp] = useState(true);

    console.log(pastWeatherData)


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

    const fetchData = async (city) => {
        try {
            setLoadingCurrentTemp(true);
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1df7be517b7b885b86f93f7a3430fbf7`);

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];

                const backendResponse = await axios.get(`http://localhost:3000/api/users/weather/current?lat=${lat}&lon=${lon}`)
                const currentTemperature = backendResponse.data;
                setCurrentTemp(currentTemperature)


                const backendResponseForcast = await axios.get(`http://localhost:3000/api/users/weather/forcast?lat=${lat}&lon=${lon}`)
                console.log('the forcast is:',backendResponseForcast.data.list)
                setForecastData(backendResponseForcast.data.list);

                const pastResponse = await axios.get(`http://localhost:3000/api/users/weather/past?lat=${lat}&lon=${lon}`);
                setPastWeatherData(pastResponse.data);
                setLoading(false);
                setLoadingCurrentTemp(false);

            } else {
                console.error("No data found for the city:", city);
                setLoading(false);
                setLoadingCurrentTemp(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
            setLoadingCurrentTemp(false);
        }
    };



    const handleSearch = (e) => {
        e.preventDefault();
        fetchData(city);
    };


    const handleFavorites = async()=>{
        try {
            const userId = localStorage.getItem('userId')
            const response = await axios.post('http://localhost:3000/api/users/favorites',{city,userId})
            console.log(response)
            
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
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city name"
                                className="p-1 rounded-lg focus:outline-none"
                            />

                        </form>
                    </div>
                </div>

                <div className="flex flex-col px-6">
                    <div className="bg-[#424242] h-[200px] bg-opacity-30 rounded-xl flex justify-between p-2">
                        <div className=" w-[33%] flex justify-center items-center">
                            <div className="flex flex-col gap-5 py-2 items-center bg-[#37ce19] h-[100px] rounded-xl w-[50%]">
                                <p className="text-white font-bold text-xl">Humidity</p>
                                <p className="text-white font-semibold text-lg">{currentTemp ? `${currentTemp.main.humidity} gm/m²` : '-'}</p>
                            </div>
                        </div>
                        <div className=" w-[33%] flex justify-center">
                            <div>
                                <p className="text-white font-bold text-xl px-6">{city.toUpperCase()}</p>
                                <div className="pl-6 pt-7 flex justify-center items-center">
                                    <img src="/sun.png" className="h-[100px]" alt="sun" />
                                    <p className="text-white font-bold text-[40px]">{currentTemp ? `${currentTemp.main.temp.toFixed(1)} °C` : '-'}</p>
                                </div>
                            </div>

                        </div>
                        <div className=" w-[33%] flex justify-center items-center relative">
                            <div className="flex flex-col gap-5 py-2 items-center bg-[#304df0] h-[100px] rounded-xl w-[50%]">
                                <p className="text-white font-bold text-xl">Wind Speed</p>
                                <p className="text-white font-semibold text-lg">{currentTemp ? `${(currentTemp.wind.speed * 3.6).toFixed(1)} km/h` : '-'}</p>
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