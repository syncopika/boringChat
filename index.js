
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//res.send('<h1> Hello </h1>');
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg){
		// this is the server sending out the message to every client
		
		// get current date and time
		var timestamp = new Date().toLocaleString();
		
		// adding whitespace doesn't work because this message will be surrounded by <li> tags 
		// instead, you can use '\u00A0', the unicode for whitespace 
		// https://stackoverflow.com/questions/12882885/how-to-add-nbsp-using-d3-js-selection-text-method
		io.emit('chat message', msg + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 " + timestamp);
	});
	socket.on('image', function(imgData){
		// send all clients the imgData that was sent here (to this server)
		io.emit('image', imgData);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

