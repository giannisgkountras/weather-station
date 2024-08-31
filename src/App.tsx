import clearDay from "./assets/Icons/yellow-sun-16526.png";
import clearNight from "./assets/Icons/yellow-moon-16536.png";
import cloudDay from "./assets/Icons/blue-clouds-and-yellow-sun-16529.png";
import cloudNight from "./assets/Icons/blue-clouds-and-blue-moon-16538.png";
import rain from "./assets/Icons/rain-and-blue-cloud-16530.png";

function App() {
    interface weather {
        weather: string;
        temp: number;
        humid: number;
        isDay: boolean;
        timestamp: string;
    }
    const weatherData: Array<weather> = [
        {
            weather: "clear",
            temp: 27,
            humid: 56,
            isDay: true,
            timestamp: "31 August",
        },
        {
            weather: "rain",
            temp: 31,
            humid: 45,
            isDay: true,
            timestamp: "1 September",
        },
        {
            weather: "cloud",
            temp: 36,
            humid: 40,
            isDay: true,
            timestamp: "2 September",
        },
        {
            weather: "clear",
            temp: 26,
            humid: 62,
            isDay: false,
            timestamp: "3 September",
        },
        {
            weather: "cloud",
            temp: 22,
            humid: 71,
            isDay: false,
            timestamp: "4 September",
        },
    ];
    return (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-950 flex-col">
            <div className="flex justify-start items-center w-11/12 h-5/6  flex-col">
                <div className="flex justify-start items-start flex-col w-full">
                    <h1 className="font-bold text-gray-300">Weather App</h1>
                    <h1 className="font-bold text-xl text-blue-400">
                        Antioxou Weather Station
                    </h1>
                    <h3 className="font-semibold text-blue-900">
                        Thessaloniki
                    </h3>
                </div>
                <div className="flex justify-evenly items-center w-full h-full">
                    {weatherData.map((entry) => (
                        <div className="flex flex-col justify-start items-start p-4 w-3/4 h-3/5 bg-slate-700 mx-4 rounded-xl">
                            <p className="font-bold text-2xl text-purple-400">
                                {entry.timestamp}
                            </p>
                            <div className="flex justify-center items-center w-full h-full">
                                <img
                                    src={
                                        entry.weather == "clear" && entry.isDay
                                            ? clearDay
                                            : entry.weather == "clear" &&
                                              !entry.isDay
                                            ? clearNight
                                            : entry.weather == "rain"
                                            ? rain
                                            : entry.weather == "cloud" &&
                                              entry.isDay
                                            ? cloudDay
                                            : cloudNight
                                    }
                                    className="w-1/2"
                                ></img>
                            </div>
                            <p className="text-xl">{entry.temp}&deg;C</p>
                            <p>{entry.humid}%</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
