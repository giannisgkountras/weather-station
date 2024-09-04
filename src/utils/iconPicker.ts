import dayClear from "../assets/WeatherIcons/clear-day.png";
import nightClear from "../assets/WeatherIcons/clear-night.png";
import dayPartlyCloudy from "../assets/WeatherIcons/partly-cloudy-day.png";
import nightPartlyCloudy from "../assets/WeatherIcons/partly-cloudy-night.png";
import cloudy from "../assets/WeatherIcons/cloudy.png";
import showers from "../assets/WeatherIcons/showers.png";
import heavyShowers from "../assets/WeatherIcons/heavy-showers.png";
import thunderShowers from "../assets/WeatherIcons/thunderstorm-showers.png";
import heavySnow from "../assets/WeatherIcons/heavy-snow.png";
import fog from "../assets/WeatherIcons/fog.png";
import snow from "../assets/WeatherIcons/snow.png";
// import thunderSnow from "../assets/WeatherIcons/thunderstorm-snow.png";
import heavySleet from "../assets/WeatherIcons/heavy-sleet.png";
import sleet from "../assets/WeatherIcons/sleet.png";
import overcast from "../assets/WeatherIcons/overcast.png";

// codes from https://open-meteo.com/en/docs
function iconPick(code: number, isDay: boolean) {
    if (code === 0) {
        if (isDay) return dayClear;
        else return nightClear;
    }
    if (code === 1) {
        if (isDay) return dayClear;
        else return nightClear;
    }
    if (code === 2) {
        if (isDay) return dayPartlyCloudy;
        else return nightPartlyCloudy;
    }
    if (code === 3) {
        if (isDay) return dayPartlyCloudy;
        else return nightPartlyCloudy;
        // return overcast;
    }
    if (code === 45 || code === 48) {
        return fog;
    }
    if (
        code === 80 ||
        code === 81 ||
        code === 51 ||
        code === 53 ||
        code === 55 ||
        code === 61 ||
        code === 63
    ) {
        return showers;
    }
    if (code === 82 || code === 65) {
        return heavyShowers;
    }
    if (code === 95 || code === 96 || code === 99) return thunderShowers;
    if (code === 56 || code === 66) return sleet;
    if (code === 57 || code === 67) return heavySleet;
    if (code === 71 || code === 73 || code === 77 || code === 85) return snow;
    if (code === 75 || code === 86) return heavySnow;
}

export default iconPick;
