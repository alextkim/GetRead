
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

// Routes
var index = require('./routes/index');
var bookpage = require('./routes/bookpage');

// Create the server instance
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

// Serving handlebars files!
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(__dirname + '/static'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes 
app.get('/', index.view);
app.get('/book/:title', bookpage.viewBooks);
app.get('/next', index.nextBook)
app.get('/prev', index.prevBook)

// Start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
