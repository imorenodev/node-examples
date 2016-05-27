var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var hostname = 'localhost';
var port = 3000;
var app = express();

app.use(morgan('dev'));
// middleware to parse body of request
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// here we handle all operations on the url/dishes URI path
app.all('/dishes', function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  next();
});

app.get('/dishes', function(req, res, next) {
  res.end('Will send all the dishes to you!');
});

// uses bodyParser middleware to access the req.body object
app.post('/dishes', function(req, res, next) {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes', function(req, res, next) {
  res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req, res, next) {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.put('/dishes/:dishId', function(req, res, next) {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next) {
  res.end('Deleting dish: ' + req.params.dishId);
});

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}`);
});