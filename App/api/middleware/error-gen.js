function errorJson (errorMessage, errorCode, errorDescription = "NaN") {
    return {
        "Error" : errorMessage,
        "Code"  : errorCode,
        "Description" : errorDescription
    };
};