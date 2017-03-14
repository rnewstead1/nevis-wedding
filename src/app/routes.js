const express = require('express');

const appRouter = express.Router();
const apiRouter = express.Router();

module.exports = (app, controllers) => {
  const { rsvp, session, invitation } = controllers;
  appRouter.get('/', (req, res) => res.render('invitation', { title: 'Nevis wedding' }));
  app.use('/', appRouter);

  apiRouter.put('/rsvp', session.verify, rsvp.save);
  apiRouter.post('/session/create', session.create);
  apiRouter.get('/invitation', invitation.get);
  app.use('/api', apiRouter);

// catch 404
  app.use((req, res) => {
    res.status(404);
    res.render('error', { message: 'Page not found' });
  });

// error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', { message: 'Oops, something went wrong!' });
  });
};
