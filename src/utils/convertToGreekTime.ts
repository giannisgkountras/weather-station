function convertToGreekTime(timestamp) {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Options for formatting the date
    const options = {
        timeZone: "Europe/Athens",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    // Format the date to Greek time
    // @ts-ignore
    return date.toLocaleString("en-GB", options);
}

export default convertToGreekTime;
