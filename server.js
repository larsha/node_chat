// require and setup server
var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app).listen(3000),
	io = require('socket.io').listen(server);

// adjust settings for express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('home.jade');
});

// hold connected clients
var clients = 0;

// when user connects with socket
io.sockets.on('connection', function (socket) {
	connectedClients(1);

	console.log( new Date() + ': socket id: ' + socket.id + ' connected.');

	socket.on('post', function (data) {
		socket.broadcast.emit('message', data);
	});

	socket.on('disconnect', function() {
		connectedClients(-1);
		console.log( new Date() + ': socket id: ' + socket.id + ' disconnected.');
	});
});

/*
 * helper functions
 */
function connectedClients(i) {
	if (i === 1)
		clients++;
	else
		clients--;

	// broadcast connected sockets to all
	io.sockets.emit('clients', {connections: clients});
}