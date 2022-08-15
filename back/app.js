require('dotenv').config();
require('@babel/register');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);

const editUserRoute = require('./routes/editUserRoute');
const authRoute = require('./routes/authRoute');
const carsRoute = require('./routes/carsRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const tentsRoute = require('./routes/tentsRoute');
const messagesRoute = require('./routes/messagesRoute');



const app = express();
const PORT = process.env.PORT ?? 3005;

const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // we send cookies
};

app.use(sessions({
  store: new FileStore(),
  name: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
}));

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.use('/editUser', editUserRoute);
app.use('/auth', authRoute);
app.use('/cars', carsRoute);
app.use('/bookings', bookingsRoute);
app.use('/tents', tentsRoute);
app.use('/messages', messagesRoute);


app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
