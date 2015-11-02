// require modules
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// config Express view engine
app.set('view_enginge', 'jade');
app.set('view_optioms', { layout: true });
app.set('views', __dirname + '/views');

// establish root route
app.get('/', function(req, res) {
	res.render('chat.jade');
});

// have socket.io listen for http connections
io.on('connection', function(socket) {
	console.log('A user has connected');
});

// listen for client connections on port 1300
var port = 1300;
server.listen(port, function() {
	console.log('Listening on port ' + port);
});