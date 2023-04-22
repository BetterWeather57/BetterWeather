const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

//local error handler
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: err.message },
  };
  const errorObj = Object.assign(defaultErr, err);
  const errorStatus = errorObj.status || 500;
  return res.status(errorStatus).send(errorObj.message);
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
});




module.exports = app;