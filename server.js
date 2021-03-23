const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials:true
}));


app.get('/',asyncHandler((req,res) => {
  res.send('Hello Testing Root')
})
);

app.use('/api',routes);

/* generic 404 error */
app.use((req, res, next) => {
  next(createError(404,"Route not found"))
})

/* final error handler */
app.use((error,req,res,next) => {
  res.status(error.status || 500);
  console.log(error);
  res.send({
    status: error.status,
    message: error.message,
    stack: error.status
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
})