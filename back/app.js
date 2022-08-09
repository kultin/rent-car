const express = require('express');
require('dotenv').config();
require('@babel/register');
const morgan = require('morgan');
const cors = require('cors');

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);

// const authRoute = require('./routes/authRoute');
// const gameRoute = require('./routes/gameRoute');
const imgRouter = require('./routes/imgRoute');

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

app.get('/', async (req, res) => {
  res.send('Hello');
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log('multer')
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
app.use('/images', imgRouter);
// app.use('/auth', authRoute);
// app.use('/game', gameRoute);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
