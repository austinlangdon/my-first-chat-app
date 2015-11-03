// require modules
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// config Express view engine
app.set('view_enginge', 'jade');
app.set('view_optioms', { layout: true });
app.set('views', __dirname + '/views');

// Everything in public will be accessible from '/'
app.use(express.static(path.join(__dirname, 'public')));

// establish root route
app.get('/', function(req, res) {
	res.render('chat.jade');
});

// have socket.io listen for http connections
io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		console.log('Client: ' + msg);
		io.emit('chat message', msg);
	});
});

// listen for client connections on port 1300
var port = 1300;
server.listen(port, function() {
	console.log('Listening on port ' + port);
});
