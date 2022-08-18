require('dotenv').config();
require('@babel/register');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);
const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'http://localhost:3000',
    ],
  }
})


const editUserRoute = require('./routes/editUserRoute');
const authRoute = require('./routes/authRoute');
const carsRoute = require('./routes/carsRoute');
const bookingsRoute = require('./routes/bookingsRoute');
const tentsRoute = require('./routes/tentsRoute');
const messagesRoute = require('./routes/messagesRoute');
const likesRoute = require('./routes/likesRoute');


const app = express();
const PORT = process.env.PORT ?? 3006;
const WSPORT = process.env.WSPORT ?? 3011;


const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
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

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  console.log(roomId);

  socket.on("newChatMessage", (data) => {
    io.in(roomId).emit("newChatMessage", data);
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});


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
app.use('/likes', likesRoute);

server.listen(WSPORT, () => {
  console.log(`Server ready. Port: ${WSPORT}`)
})

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
