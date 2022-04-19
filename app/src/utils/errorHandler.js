const errorHandler = (error) => {
  // https://stackoverflow.com/questions/53729361/how-i-can-catch-php-response-error-with-axios

  let message = '';
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    message = error.response.data.error;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message;
  }

  return message;
};

export default errorHandler;
