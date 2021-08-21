const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const {
  usersRouter,
  transactionsRouter,
} = require('./routes/api/');


const app = express();

// Middlewares
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/finapp-api/transactions', transactionsRouter);
app.use('/finapp-api/users', usersRouter);
app.use((_, res) => {
  res.status(404).json({ status: 'error', code: '404', message: 'Not found' });
});

// Error handler
app.use((err, _, res, __) => {
  err.status = err.status || 500;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
  });
});

module.exports = app;
