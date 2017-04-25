const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');

const appRouter = express.Router();
const apiRouter = express.Router();

module.exports = (app, controllers) => {
  const { rsvp, session, invitation } = controllers;

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
  }));

  appRouter.get('/', (req, res) => res.render('invitation', { title: 'Nevis wedding' }));
  app.use('/', appRouter);

  apiRouter.put('/rsvp', session.verify, rsvp.save);
  apiRouter.post('/session/create', session.create);
  apiRouter.get('/invitation', invitation.get);
  app.use('/api', apiRouter);

// catch 404
  app.use((req, res) => {
    res.status(404);
    res.render('error', { message: 'Page not found', title: 'Not found' });
  });

// error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', { message: 'Oops, something went wrong!', title: 'Error' });
  });

  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      })
    ]
  }));
};
