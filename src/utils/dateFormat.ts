function dateFormat(dateInput: string) {
    const date = dateInput.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];
    return day.concat("-").concat(month);
}

export default dateFormat;
