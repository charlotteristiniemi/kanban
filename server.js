var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes');

var server = express();

// View setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

// Middleware
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
server.use(bodyParser.json());

// Log all /GET, /POST, /PUT request
server.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// GET, POST and PUT request to browser
server.get('/', routes.home);
server.post('/', routes.add);
server.delete('/:id', routes.delete);
server.get('/move_note_to_right/:id/:category_id', routes.moveToRight);
server.get('/move_note_to_left/:id/:category_id', routes.moveToLeft);
server.get('/filter', routes.filterPage);
server.post('/filter', routes.filterNotes);

// Start Server
var server = server.listen(3000,function(){
  console.log("Listening to port %s",server.address().port);
});