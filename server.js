const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const passport = require("passport");
require('custom-env').env();

const users = require('./routes/api/users');
const test = require('./routes/api/test');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

// Logging http calls with Morgan
app.use(morgan('tiny'));

// routes
app.use('/users', users);
app.use('/test', test);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
