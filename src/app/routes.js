const express = require('express');
const authMiddleware = require('./middleware/auth-middleware');

const appRouter = express.Router();
const apiRouter = express.Router();

module.exports = (app, controllers) => {
  const { rsvp, auth } = controllers;
  appRouter.get('/', (req, res) => res.render('landing', { title: 'Nevis wedding' }));
  appRouter.get('/rsvp', (req, res) => res.render('rsvp', { title: 'RSVP' }));
  app.use('/', appRouter);

  apiRouter.put('/rsvp', authMiddleware, rsvp.save);

  apiRouter.post('/authenticate', auth.authenticate);

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
