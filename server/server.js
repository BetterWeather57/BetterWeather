const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// require routes



// parse request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser()); // for req.cookies


// require routers
// const userRouter = require('./routes/users');
const weatherController = require('./controllers/weatherController.js')


// static files




// route handlers
// user route, saved locations
// app.use('/', userRouter)


// weather api route, specific location at /weather/:id ?
app.get('/weather/:location', weatherController.getWeather, (req, res) => {
  return res.status(200).json(res.locals.stats);
});


// database/saved locations route
// app.use('/saved-locations', )











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