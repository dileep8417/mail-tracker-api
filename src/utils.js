exports.isValidToken = (token) => {
    const validTokenRegex = /^[0-9a-fA-F]{24}$/; 
    if (!token || !validTokenRegex.test(token)) {
        return null;
    }
    return true;
}

exports.getCurrentDatTime = () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const hours = ("0" + now.getHours()).slice(-2);
    const minutes = ("0" + now.getMinutes()).slice(-2);
    const seconds = ("0" + now.getSeconds()).slice(-2);

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}