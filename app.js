const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const register = require('@react-ssr/express/register');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
//const ReactDOMServer = require('react-dom/server');
require('dotenv').config();
const routes = require('./server/routers/routes.js');
//const routes = require('./db1.js');
const nocache = require("nocache");

(async () => {
  await register(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
//var options = { beautify: true, doctype: "<!DOCTYPE html>" };
//app.engine('jsx', require('express-react-views').createEngine(options));

app.get('/favicon.ico', function(req, res) { 
  res.sendStatus(204); 
});

const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true, optionSuccessStatus:200 }));
app.use(expressSession);
app.use(nocache());
  
/*const jwt = require('jsonwebtoken')
const token = jwt.sign({ _id: 'abc123' }, 'wedontneednoeducation')
console.log("token {1}", token);

const data = jwt.verify(token, 'wedontneednoeducation')
console.log("data {1}", data);*/

app.get('/a', function(req, res, next) {
  res.render('./Components/Map');
})

/*app.post('/a1', function(req, res, next) {
  return res.render('./Components/a1', {user: req.user })
});*/

/*app.get('/a', function(req, res, next) {
  let href = "https://spreadsheets.google.com/feeds/list/18GAUw1YmWC2pcCug6jqU_atcIn51fQSrDLNmcuqdoP8/od6/public/values?alt=json"
  fetch(href)
      .then(response => response.json())
      .then(data => { res.json (data) })
	    .catch(err => res.status(404).json(err))
});*/

app.use('/', routes);

app.get('/*', function(req, res, next) {
  next ({ status: 404, message: "הדף לא קיים"})
  //next ({message: "הדף לא קיים"})
})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;
  
  // render the error page
  res.status(err.status || 500);
  res.render('./error');
});

})();


module.exports = app;