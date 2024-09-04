import React from "react";

import iconPick from "../utils/iconPicker";
import dateFormat from "../utils/dateFormat";

export default function DailyWeatherCard({ day }) {
    return (
        <div className="flex flex-col justify-start items-start w-32 min-w-32 h-40 bg-[#889398]  bg-opacity-50 mx-2 rounded-xl">
            <p className="text-xl text-center w-full m-0">
                {dateFormat(day.date)}
            </p>
            <div className="flex justify-center items-center w-full h-full">
                <img
                    src={iconPick(
                        day.weather_code,

                        true
                    )}
                    className="w-24"
                ></img>
            </div>
            <div className="flex justify-evenly w-full h-full items-start">
                <p className="text-l w-1/2 text-center bg-blue-400 rounded-xl bg-opacity-20 mx-1">
                    {day.temperature_2m_min}&deg;C
                </p>
                <p className="text-l w-1/2 text-center bg-red-400 rounded-xl bg-opacity-20 mx-1 ">
                    {day.temperature_2m_max}&deg;C
                </p>
            </div>
        </div>
    );
}
