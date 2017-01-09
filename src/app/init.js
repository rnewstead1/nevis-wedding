const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const MongoClient = require('mongodb').MongoClient;
const emailSenderCtr = require('./email/email-sender');
const rsvpController = require('./controllers/rsvp');
const sessionController = require('./controllers/session');
const contentController = require('./controllers/content');
const wedding = require('./store/wedding');
const localData = require('./local-data');

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

const config = {
  emailFromAddress: process.env.EMAIL_USER,
  emailFromPassword: process.env.EMAIL_PASS,
  emailToOwnersAddress: process.env.EMAIL_RECIPIENTS,
  shouldEmail: process.env.SHOULD_EMAIL
};

if (config.shouldEmail) {
  console.log('Email sending turned on.');
}

MongoClient.connect(process.env.MONGODB_URI)
  .then((db) => {
    if (app.get('env') === 'development') {
      localData(db);
    }
    return db;
  }).then(db =>
  emailSenderCtr(config, wedding(db))
    .then((emailSender) => {
      const controllers = {
        rsvp: rsvpController(db, emailSender),
        session: sessionController(db),
        content: contentController(db)
      };
      routes(app, controllers);
    })
).catch(err => console.log('err: ', err));

module.exports = app;
