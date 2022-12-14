require('dotenv').config();

const mongoose = require('mongoose');
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const sessionConfig = require('./config/session.config');
const flash = require("connect-flash");

require('./config/db.config');
const app = express();

/* Middlewares */

app.use(express.json());
app.use(cors());

/* app.use(flash()); // to show flash message after submit form
app.use(sessionConfig); // need it to use flash

app.use((req, res, next) => {
  res.locals.flashMessage = req.flash('flashMessage');
  next();
}); */


/* Routes */

const routes = require('./config/routes');
app.use('/api', routes);

app.get('/', cors(), function (req, res, next) {
    res.json('This is CORS-enabled for a Single Route')
  })


/* Handle errors */

app.use((req, res, next) => {
    next(createError(404, 'Route not found'))
  })
  
  app.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
      error = createError(400, error);
    } else if (error instanceof mongoose.Error.CastError) {
      error = createError(404, "Resource not found");
    } else if (error.message.includes("E11000")) {
      error = createError(400, "Already exists");
    } else if (!error.status) {
      error = createError(500, error);
    }
  
    if (error.status >= 500) {
      console.error(error);
    }
  
    const data = {};
    data.message = error.message;
    data.errors = error.errors
      ? Object.keys(error.errors).reduce(
          (errors, key) => ({
            ...errors,
            [key]: error.errors[key].message || error.errors[key],
          }),
          {}
        )
      : undefined;
  
    res.status(error.status).json(data);
  });
  
  const port = Number(process.env.PORT || 3001);
  
  app.listen(port, () => {
    console.log(`Ready! Listen on port ${port}`);
  });