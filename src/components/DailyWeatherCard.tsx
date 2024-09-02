import React from "react";
import clearDay from "../assets/Icons/yellow-sun-16526.png";
import clearNight from "../assets/Icons/yellow-moon-16536.png";
import cloudDay from "../assets/Icons/blue-clouds-and-yellow-sun-16529.png";
import cloudNight from "../assets/Icons/blue-clouds-and-blue-moon-16538.png";
import rain from "../assets/Icons/rain-and-blue-cloud-16530.png";

export default function DailyWeatherCard({ day }) {
    console.log(day);
    return (
        <div className="flex flex-col justify-start items-start p-4 w-3/4 h-3/5 bg-slate-700 mx-4 rounded-xl">
            <p className="font-bold text-2xl text-purple-400">
                {/* {entry.timestamp} */}
            </p>
            <div className="flex justify-center items-center w-full h-full">
                {/* <img
                    src={
                        entry.weather == "clear" && entry.isDay
                            ? clearDay
                            : entry.weather == "clear" && !entry.isDay
                            ? clearNight
                            : entry.weather == "rain"
                            ? rain
                            : entry.weather == "cloud" && entry.isDay
                            ? cloudDay
                            : cloudNight
                    }
                    className="w-1/2"
                ></img> */}
            </div>
            <p className="text-xl">Date{day.date}&deg;C</p>
            <p className="text-xl">DaylightD{day.daylight_duration}&deg;C</p>
            <p className="text-xl">Sunri{day.sunrise}&deg;C</p>
            <p className="text-xl">Suns{day.sunset}&deg;C</p>
            <p className="text-xl">Weath{day.weather_code}&deg;C</p>
            <p className="text-xl">Max{day.temperature_2m_max}&deg;C</p>
            <p className="text-xl">Min{day.temperature_2m_min}&deg;C</p>
            {/* <p>{entry.humid}%</p> */}
        </div>
    );
}
