const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const history = require('connect-history-api-fallback');
const db = require('./db/db_config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');
const tagsRouter = require('./routes/tags');
const sessionRouter = require('./routes/session');

const app = express();

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

app.use(history());

// Set up user session
app.use(session({
    secret: 'neighborhood-connect-secret',
    resave: true,
    saveUninitialized: true
  }));


  

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);
app.use('/tags', tagsRouter);
app.use('/session', sessionRouter);




// Catch all other routes into a meaningful error message
app.all('*', (req, res) => {
    const errorMessage = `
      Cannot find the resource <b>${req.url}</b>
      <br>
      Please use only supported routes below
      <br><br>
  
      <b>Home Neighborhood Connect</b>
      <br>
      GET / -- Go to home page
      <br>
      GET /:name -- Go to URL of short named :name
  
      <br><br>
  
      <b>Shorts</b>
      <br>
      GET /api/shorts -- Display all shorts stored on the server
      <br>
      POST /api/shorts -- Create and store a new short on the server
      <br>
      PUT /api/shorts/:name -- Update the short on the server with short name :name
      <br>
      DELETE /api/shorts/:name -- Delete the short on the server with short name :name
  
      <br><br>
  
      <b>Authentication</b>
      <br>
      POST /api/session -- Authenticate with username into the server
    `;
  
    res.status(404).send(errorMessage);
  });

module.exports = app;
