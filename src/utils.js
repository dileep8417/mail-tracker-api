exports.isValidToken = (token) => {
    const validTokenRegex = /^[0-9a-fA-F]{24}$/; 
    if (!token || !validTokenRegex.test(token)) {
        return null;
    }
    return true;
}