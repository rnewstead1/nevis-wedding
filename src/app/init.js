const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const MongoClient = require('mongodb').MongoClient;
const rsvpController = require('./controllers/rsvp');
const sessionController = require('./controllers/session');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, '../../public'),
  dest: path.join(__dirname, '../../public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, '../../public')));

MongoClient.connect(process.env.MONGODB_URI)
  .then((db) => {
    const controllers = { rsvp: rsvpController(db), session: sessionController() };
    routes(app, controllers);
  })
  .catch(err => console.log('err: ', err));

module.exports = app;
