import React, { useEffect, useState } from "react";
import DailyWeatherCard from "../components/DailyWeatherCard";
import clearNight from "../assets/Icons/yellow-moon-16536.png";
import timeFormat from "../utils/timeFormat";
import tempIcon from "../assets/temperature.png";
import humidityIcon from "../assets/humidity.png";

export default function MainScreen() {
    interface espData {
        temperature: number;
        humidity: number;
        timestamp: string;
    }

    const [forecastData, setForecastData] = useState({});
    const [loadingForecast, setLoadingForecast] = useState(true);
    const [loadingStation, setLoadingStation] = useState(true);
    const [dailyData, setDailyData] = useState([]);
    const [stationData, setStationData] = useState<espData>({
        temperature: 0,
        humidity: 0,
        timestamp: "",
    });

    useEffect(() => {
        fetch("api/sensorData")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data: espData) => {
                setStationData(data);
                setLoadingStation(false);
            })
            .catch((error) => {
                console.log(error.message);
            });

        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=40.6436&longitude=22.9309&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,uv_index,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration&timezone=auto&forecast_hours=24&models=best_match"
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setForecastData(data);
                setLoadingForecast(false);
                const daily = data.daily;
                const result = daily.time.map((date, index) => ({
                    date: date,
                    daylight_duration: daily.daylight_duration[index],
                    sunrise: daily.sunrise[index],
                    sunset: daily.sunset[index],
                    sunshine_duration: daily.sunshine_duration[index],
                    temperature_2m_max: daily.temperature_2m_max[index],
                    temperature_2m_min: daily.temperature_2m_min[index],
                    weather_code: daily.weather_code[index],
                }));
                setDailyData(result);
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []); // Empty dependency array means this useEffect runs only once when the component mounts

    return (
        <div className="flex justify-center items-center w-screen h-screen flex-col bg-[#182848]">
            <div className="flex justify-start items-center w-screen h-screen  flex-col">
                <div className="flex justify-center items-start flex-col w-11/12 py-4 ">
                    <h1 className="font-bold text-5xl text-gray-100">
                        Thessaloniki
                    </h1>
                    <h1 className="text-xl text-gray-300">
                        {!loadingForecast &&
                            timeFormat(forecastData.current.time)}
                    </h1>
                </div>

                <div className="flex justify-between items-center flex-col w-11/12 h-72  bg-slate-300 bg-opacity-10 rounded-2xl">
                    <h1 className="text-lg w-full text-center">
                        {loadingStation ? "Loading..." : "Live Data"}
                    </h1>
                    <div className="flex w-full justify-evenly items-center">
                        <h1 className="text-7xl">
                            {!loadingStation && stationData.temperature}&deg;
                        </h1>
                        <img src={clearNight} className="h-20"></img>
                    </div>
                    <h1 className="text-xl">
                        Humidity {!loadingStation && stationData.humidity}%
                    </h1>
                    <div className="flex w-full justify-evenly items-center h-14 ">
                        <div className="flex justify-center items-center  bg-purple-500 rounded-full bg-opacity-20 py-1 px-2">
                            <img src={tempIcon} className="h-6"></img>
                            <h1 className="text-xl">
                                {!loadingForecast &&
                                    forecastData.current.temperature_2m}
                                &deg;C
                            </h1>
                        </div>
                        <div className="flex justify-center items-center bg-purple-500 rounded-full bg-opacity-20 py-1 px-2">
                            <img src={humidityIcon} className="h-6"></img>
                            <h1 className="text-xl">
                                {!loadingForecast &&
                                    forecastData.current.relative_humidity_2m}
                                %
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-start flex-col w-full py-6">
                    <h1 className="font-bold text-xl text-gray-100">
                        {loadingStation ? "station loading..." : ""}
                    </h1>
                    <h1 className="font-bold text-xl text-gray-400">
                        {loadingForecast ? "forecast loading..." : ""}
                    </h1>
                </div>
                <h1 className="text-xl">Daily forecast</h1>
                <div className="flex justify-evenly items-center w-full h-48 max-w-full overflow-scroll">
                    {!loadingForecast &&
                        dailyData.map((day, index) => (
                            <DailyWeatherCard day={day} key={index} />
                        ))}
                </div>
            </div>
        </div>
    );
}
