import React from "react";

import iconPick from "../utils/iconPicker";
import dateFormat from "../utils/dateFormat";
import timeOnly from "../utils/timeOnly";
import tempIcon from "../assets/temperature.png";
import humidityIcon from "../assets/humidity.png";

export default function HourlyWeatherCard({ hour }) {
    return (
        <div className="flex flex-col justify-start items-start w-32 min-w-32 h-40 bg-[#889398]  bg-opacity-50 m-2 rounded-xl">
            <p className="text-xl text-center w-full m-0">
                {timeOnly(hour.date)}
            </p>
            <div className="flex justify-center items-center w-full h-full">
                <img
                    src={iconPick(
                        hour.weather_code,

                        hour.isDay
                    )}
                    className="w-24"
                ></img>
            </div>
            <div className="flex justify-evenly w-full h-full items-start">
                <div className="flex justify-center items-center w-full h-full">
                    <img src={tempIcon} className="h-5"></img>
                    <p className="text-l text-center w-full">
                        {hour.temperature_2m}&deg;C
                    </p>
                </div>
                <div className="flex justify-center items-center w-full h-full">
                    <img src={humidityIcon} className="h-7"></img>
                    <p className="text-l text-center w-full">
                        {hour.relative_humidity_2m}%
                    </p>
                </div>
            </div>
        </div>
    );
}
