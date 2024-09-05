import React, { useEffect, useState } from "react";
import DailyWeatherCard from "../components/DailyWeatherCard";

import timeFormat from "../utils/timeFormat";
import tempIcon from "../assets/temperature.png";
import humidityIcon from "../assets/humidity.png";
import iconPick from "../utils/iconPicker";
import HourlyWeatherCard from "../components/HourlyWeatherCard";

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
    const [hourlyData, setHourlyData] = useState([]);
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
            "https://api.open-meteo.com/v1/forecast?latitude=40.6436&longitude=22.9309&current=temperature_2m,relative_humidity_2m,is_day,weather_code&hourly=temperature_2m,relative_humidity_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_hours=24&models=best_match"
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
                const hourly = data.hourly;
                const dailyResult = daily.time.map((date, index) => ({
                    date: date,
                    temperature_2m_max: daily.temperature_2m_max[index],
                    temperature_2m_min: daily.temperature_2m_min[index],
                    weather_code: daily.weather_code[index],
                }));
                const hourlyResult = hourly.time.map((date, index) => ({
                    date: date,
                    temperature_2m: hourly.temperature_2m[index],
                    relative_humidity_2m: hourly.relative_humidity_2m[index],
                    weather_code: hourly.weather_code[index],
                    isDay: hourly.is_day[index],
                }));
                setDailyData(dailyResult);
                setHourlyData(hourlyResult);
                console.log(data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, []); // Empty dependency array means this useEffect runs only once when the component mounts
    console.log(hourlyData);

    return (
        <div className="flex justify-center items-center w-screen min-h-max flex-col bg-[#e6f4f1]  overflow-auto">
            <div className="flex justify-start items-center w-screen h-screen  flex-col">
                <div className="flex justify-center items-start flex-col w-11/12 py-4 ">
                    <h1 className="font-bold text-5xl text-sky-950">
                        Thessaloniki
                    </h1>
                    <h1 className="text-xl text-sky-950">
                        {!loadingForecast &&
                            timeFormat(forecastData.current.time)}
                    </h1>
                </div>

                <div className="flex justify-between items-center flex-col w-11/12 h-64 py-2  bg-sky-950 bg-opacity-70 rounded-2xl">
                    <h1 className="text-lg w-full text-center">
                        {loadingStation ? "Loading..." : "Live Data"}
                    </h1>

                    <div className="flex w-full justify-evenly items-center">
                        <h1 className="text-7xl">
                            {!loadingStation && stationData.temperature}&deg;
                        </h1>
                        {!loadingForecast && (
                            <img
                                src={iconPick(
                                    forecastData.current.weather_code,

                                    forecastData.current.is_day
                                )}
                                className="h-32"
                            ></img>
                        )}
                    </div>
                    <h1 className="text-xl">
                        Humidity {!loadingStation && stationData.humidity}%
                    </h1>
                    <div className="flex w-full justify-evenly items-center h-14 mt-2 ">
                        <div className="flex justify-center items-center  bg-pink-400 rounded-full bg-opacity-20 py-1 px-2">
                            <img src={tempIcon} className="h-6"></img>
                            <h1 className="text-xl">
                                {!loadingForecast &&
                                    forecastData.current.temperature_2m}
                                &deg;C
                            </h1>
                        </div>
                        <div className="flex justify-center items-center bg-pink-400 rounded-full bg-opacity-20 py-1 px-2">
                            <img src={humidityIcon} className="h-8"></img>
                            <h1 className="text-xl">
                                {!loadingForecast &&
                                    forecastData.current.relative_humidity_2m}
                                %
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-center flex-col w-11/12 h-60 py-2 min-h-60 bg-[#849fb3] bg-opacity-70 rounded-2xl mt-4 overflow-hidden">
                    <h1 className="text-xl text-sky-950 mb-3">
                        Hourly forecast
                    </h1>
                    <div className="flex justify-start items-start w-full overflow-auto">
                        {!loadingForecast &&
                            hourlyData.map((hour, index) => (
                                <HourlyWeatherCard hour={hour} key={index} />
                            ))}
                    </div>
                </div>
                <div className="flex justify-start items-center flex-col w-11/12 h-60 py-2 min-h-60 bg-[#7d80a3] bg-opacity-70 rounded-2xl my-4 overflow-hidden">
                    <h1 className="text-xl text-sky-950 mb-3">
                        Weekly forecast
                    </h1>
                    <div className="flex justify-start items-start w-full overflow-auto">
                        {!loadingForecast &&
                            dailyData.map((day, index) => (
                                <DailyWeatherCard day={day} key={index} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
