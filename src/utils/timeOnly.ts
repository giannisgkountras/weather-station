function timeOnly(time: string) {
    const fields = time.split("T");
    return fields[1];
}

export default timeOnly;
