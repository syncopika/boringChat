// set up server 
// also hooking up database (mongodb) 

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// database stuff here !
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


// this will serve the login page to the user first!
// if login is successful, then the server can serve the chat page
app.get('/', function(req, res){
	
	//res.sendFile(__dirname + '/login.html');
	
	// this says: "send the html page to the client"
	res.sendFile(__dirname + '/index.html');
});

// this is for when a login is successful. send the client the chat page.
app.get('/test', function(req, res){
	console.log("i see the request.");
	res.sendFile(__dirname + '/index.html');
});


// when user loads page, client page should automatically send a getJSON request to this server
// the request will ask for a url, which the below will respond to. simply connect to the database
// and send back the default ascii faces info as the response. 
app.get('/default', function(req, res){
	
	// connect with database 
	var url = 'mongodb://127.0.0.1:27017';
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("getting the default ascii faces ^_^...");
		
		// get the default emoticons 
		var defaultSet = db.collection('users').findOne({"_id": "default"}, function(err, result){
			res.send(result); // send back to client the associative array with all the default emoticons 
		});
		
		db.close();
	});
});


// this is for when the user deletes an ascii face 
// btw, an interesting thing about using variable names for keys in objects:
// https://stackoverflow.com/questions/2274242/using-a-variable-for-a-key-in-a-javascript-object-literal
// https://stackoverflow.com/questions/17039018/how-to-use-a-variable-as-a-field-name-in-mongodb-native-findone
app.delete('/delete_asciiface', function(req, res){
	
	// get the queries' values so we know which ascii face user wants to delete 
	var faceCategory = req.query.category;
	var selectedFace = req.query.face;
	
	// connect with db 
	var url = 'mongodb://127.0.0.1:27017';
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("removing the selected emoticon...");
		
		// do delete here 
		var categoryToFind = "ascii_" + faceCategory;
		var query = {};
		query[categoryToFind] = { $in: [selectedFace] };
		var removeAscii = {$pull: ""};
		
		// can't acess $pull operator directly, so try loop 
		for(prop in removeAscii){
			removeAscii[prop] = query;
		}
		
		// element should be removed here after update 
		db.collection('users').update({"_id": "default"}, removeAscii);
		
		// then send back to client the updated info 
		var updatedSet = db.collection('users').findOne({"_id": "default"}, function(err, result){
			//console.log(result);
			res.send(result); 
		});
		
		db.close();
	});
});

io.on('connection', function(socket){
	console.log('a user connected');

	// this is where the database lives 
	var url = 'mongodb://127.0.0.1:27017/admin';
	
	// when server is on, the database will also be connected  
	MongoClient.connect(url, function(err, db){
		assert.equal(null, err);
		console.log("connected to server");
		
		// create (or use if already existing) new collection called 'users' 
		var coll = db.collection('users');
		
		// this is the collection of default ascii faces
		// the upsert should prevent adding duplicates 
		coll.update(
			{"_id": "default"},
			// this object represents the default user! so id is default. 
			{   
				"_id": "default",  
				"ascii_happy": ["^_^", ":)", ":D"],
				"ascii_sad": [":<"], 
				"ascii_angry": ["（　ﾟДﾟ）", ">:|"], 
				"ascii_funny": ["¯\\_(ツ)_/¯"],
				"ascii_other": ["ʕ•ᴥ•ʔ"]
			},
			{upsert: true}
		);
		
		db.close();
	});

	
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

