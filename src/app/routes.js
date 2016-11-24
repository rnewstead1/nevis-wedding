const express = require('express');

const router = express.Router();
const apiRouter = express.Router();

module.exports = (app, db) => {
  router.get('/', (req, res) => res.render('landing', { title: 'Nevis wedding' }));
  router.get('/rsvp', (req, res) => res.render('rsvp', { title: 'RSVP' }));
  app.use('/', router);

  apiRouter.put('/rsvp', (req, res) => {
    const collection = db.collection('guests');
    return collection.insertOne(req.body)
      .then(() => {
        console.log('Saved ', req.body);
        return res.sendStatus(201);
      })
      .catch((err) => {
        console.log('Save failed', err);
        return res.sendStatus(500);
      });
  });

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
