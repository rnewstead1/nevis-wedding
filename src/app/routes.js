const express = require('express');

const appRouter = express.Router();
const apiRouter = express.Router();

module.exports = (app, controllers) => {
  const { rsvp, session, content } = controllers;
  appRouter.get('/', (req, res) => res.render('landing', { title: 'Nevis wedding' }));
  appRouter.get('/rsvp', (req, res) => res.render('rsvp', { title: 'RSVP' }));
  appRouter.get('/rsvp-response', (req, res) => res.render('rsvp-response', { title: 'Thank you' }));
  app.use('/', appRouter);

  apiRouter.put('/rsvp', session.verify, rsvp.save);
  apiRouter.get('/rsvp-status', session.verify, rsvp.status);
  apiRouter.post('/session/create', session.create);
  apiRouter.get('/content/landing', content.landing);
  app.use('/api', apiRouter);

// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
  app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
