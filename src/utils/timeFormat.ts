function timeFormat(time: string) {
    const fields = time.split("T");
    const date = fields[0].split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return fields[1]
        .concat(" ")
        .concat(day)
        .concat("-")
        .concat(month)
        .concat("-")
        .concat(year);
}

export default timeFormat;
