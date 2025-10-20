const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/auth-routes');
const userRouter = require('./routes/user-routes');
const taskRouter = require('./routes/task-routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    isSuccess: false,
    error: {
      message: err.message
    }
  });
});

module.exports = app;