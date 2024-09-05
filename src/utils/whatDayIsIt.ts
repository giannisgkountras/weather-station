function whatDayIsit() {
    const dateTime = new Date();

    // Get the day as a number (0 = Sunday, 1 = Monday, etc.)
    const dayNumber = dateTime.getDay();

    // Array to map the day number to the actual day name
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Get the name of the day
    const dayName = daysOfWeek[dayNumber];
    return dayName;
}

export default whatDayIsit;
